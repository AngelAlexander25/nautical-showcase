import type { ProductLine } from '@/data/catalogData';

export const CATALOG_STORAGE_KEY = 'catalogData';

const getSyncUrl = () => import.meta.env.VITE_CATALOG_SYNC_URL?.trim();

const getSyncMethod = () =>
  (import.meta.env.VITE_CATALOG_SYNC_METHOD?.toUpperCase() || 'PUT') as 'PUT' | 'POST' | 'PATCH';

const getSyncToken = () => import.meta.env.VITE_CATALOG_SYNC_TOKEN?.trim();

const getSyncTokenHeader = () =>
  import.meta.env.VITE_CATALOG_SYNC_TOKEN_HEADER?.trim() || 'Authorization';

const parseCatalogPayload = (payload: unknown): ProductLine[] | null => {
  if (Array.isArray(payload)) {
    return payload as ProductLine[];
  }

  if (payload && typeof payload === 'object') {
    const catalogPayload = payload as { productLines?: unknown; data?: unknown };

    if (Array.isArray(catalogPayload.productLines)) {
      return catalogPayload.productLines as ProductLine[];
    }

    if (Array.isArray(catalogPayload.data)) {
      return catalogPayload.data as ProductLine[];
    }
  }

  return null;
};

const getRemoteHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = getSyncToken();
  if (!token) return headers;

  const tokenHeader = getSyncTokenHeader();
  headers[tokenHeader] =
    tokenHeader.toLowerCase() === 'authorization' && !token.startsWith('Bearer ')
      ? `Bearer ${token}`
      : token;

  return headers;
};

export const isRemoteSyncEnabled = () => Boolean(getSyncUrl());

export const loadCatalogFromRemote = async (): Promise<ProductLine[] | null> => {
  const url = getSyncUrl();
  if (!url) return null;

  const response = await fetch(url, {
    method: 'GET',
    headers: getRemoteHeaders(),
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar catálogo remoto (${response.status})`);
  }

  const payload = (await response.json()) as unknown;
  return parseCatalogPayload(payload);
};

export const saveCatalogToRemote = async (productLines: ProductLine[]) => {
  const url = getSyncUrl();
  if (!url) return;

  const response = await fetch(url, {
    method: getSyncMethod(),
    headers: getRemoteHeaders(),
    body: JSON.stringify({
      productLines,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`No se pudo guardar catálogo remoto (${response.status})`);
  }
};
