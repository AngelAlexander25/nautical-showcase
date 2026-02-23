import { getStore } from '@netlify/blobs';

const STORE_NAME = 'catalog-store';
const PRODUCT_LINES_KEY = 'productLines';
const UPDATED_AT_KEY = 'updatedAt';
const LAST_BACKUP_KEY = 'lastBackupKey';
const BACKUP_PREFIX = 'backups/';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

const createResponse = (statusCode, payload) => ({
  statusCode,
  headers: jsonHeaders,
  body: JSON.stringify(payload),
});

const parseRequestBody = (rawBody) => {
  if (!rawBody) return null;

  try {
    return JSON.parse(rawBody);
  } catch {
    return null;
  }
};

const countProducts = (lines) => {
  if (!Array.isArray(lines)) return 0;

  return lines.reduce((lineAcc, line) => {
    const categories = Array.isArray(line?.categories) ? line.categories : [];

    const lineProducts = categories.reduce((catAcc, category) => {
      const products = Array.isArray(category?.products) ? category.products : [];
      return catAcc + products.length;
    }, 0);

    return lineAcc + lineProducts;
  }, 0);
};

const createBackupKey = () => `${BACKUP_PREFIX}${Date.now()}`;

const getManualCredentials = () => {
  const rawSiteID =
    process.env.NETLIFY_BLOBS_SITE_ID ||
    process.env.NETLIFY_SITE_ID ||
    process.env.SITE_ID;

  const rawToken =
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.NETLIFY_ACCESS_TOKEN ||
    process.env.NETLIFY_AUTH_TOKEN;

  const siteID = typeof rawSiteID === 'string' ? rawSiteID.trim() : '';
  const token = typeof rawToken === 'string' ? rawToken.trim() : '';

  return { siteID, token };
};

const getStoreClient = () => {
  const { siteID, token } = getManualCredentials();
  if (siteID && token) {
    try {
      return getStore(STORE_NAME, { siteID, token });
    } catch {
      return getStore({ name: STORE_NAME, siteID, token });
    }
  }

  return getStore(STORE_NAME);
};

const formatStorageError = (error) => {
  const { siteID, token } = getManualCredentials();

  if (error?.name === 'MissingBlobsEnvironmentError') {
    return {
      error:
        'Blobs no configurado. Define NETLIFY_BLOBS_SITE_ID y NETLIFY_BLOBS_TOKEN (o verifica runtime de Netlify).',
      diagnostics: {
        hasSiteID: Boolean(siteID),
        hasToken: Boolean(token),
      },
    };
  }

  return {
    error: error instanceof Error ? error.message : 'Error de almacenamiento',
    diagnostics: {
      hasSiteID: Boolean(siteID),
      hasToken: Boolean(token),
    },
  };
};

export async function handler(event) {
  const method = event.httpMethod?.toUpperCase() || 'GET';
  let store;
  try {
    store = getStoreClient();
  } catch (error) {
    return createResponse(500, formatStorageError(error));
  }

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: '',
    };
  }

  if (method === 'GET') {
    try {
      const [productLines, updatedAt, lastBackupKey] = await Promise.all([
        store.get(PRODUCT_LINES_KEY, { type: 'json' }),
        store.get(UPDATED_AT_KEY),
        store.get(LAST_BACKUP_KEY),
      ]);

      return createResponse(200, {
        productLines: Array.isArray(productLines) ? productLines : null,
        updatedAt: updatedAt || null,
        totalProducts: countProducts(productLines),
        lastBackupKey: lastBackupKey || null,
      });
    } catch (error) {
      return createResponse(500, formatStorageError(error));
    }
  }

  if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
    const body = parseRequestBody(event.body);
    const productLines = Array.isArray(body)
      ? body
      : Array.isArray(body?.productLines)
        ? body.productLines
        : null;

    if (!productLines) {
      return createResponse(400, {
        error: 'El body debe incluir un arreglo productLines.',
      });
    }

    const updatedAt = body?.updatedAt || new Date().toISOString();
    const isForceOverwrite = event.queryStringParameters?.force === '1';

    try {
      const [existingProductLines, existingUpdatedAt] = await Promise.all([
        store.get(PRODUCT_LINES_KEY, { type: 'json' }),
        store.get(UPDATED_AT_KEY),
      ]);

      const existingCount = countProducts(existingProductLines);
      const incomingCount = countProducts(productLines);

      if (existingCount > 0 && incomingCount === 0 && !isForceOverwrite) {
        return createResponse(409, {
          error:
            'Protección activa: se bloqueó un guardado vacío para evitar pérdida accidental de catálogo.',
          existingCount,
          incomingCount,
        });
      }

      let backupKey = null;
      if (Array.isArray(existingProductLines) && existingProductLines.length > 0) {
        backupKey = createBackupKey();

        await Promise.all([
          store.set(
            backupKey,
            JSON.stringify({
              productLines: existingProductLines,
              updatedAt: existingUpdatedAt || null,
              backedUpAt: new Date().toISOString(),
            }),
            { contentType: 'application/json' }
          ),
          store.set(LAST_BACKUP_KEY, backupKey),
        ]);
      }

      await Promise.all([
        store.set(PRODUCT_LINES_KEY, JSON.stringify(productLines), {
          contentType: 'application/json',
        }),
        store.set(UPDATED_AT_KEY, String(updatedAt)),
      ]);

      return createResponse(200, {
        ok: true,
        updatedAt,
        backupKey,
        totalProducts: incomingCount,
      });
    } catch (error) {
      return createResponse(500, formatStorageError(error));
    }
  }

  return createResponse(405, {
    error: `Método no permitido: ${method}`,
  });
}
