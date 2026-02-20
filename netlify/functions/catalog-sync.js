import { getStore } from '@netlify/blobs';

const STORE_NAME = 'catalog-store';
const PRODUCT_LINES_KEY = 'productLines';
const UPDATED_AT_KEY = 'updatedAt';

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

const getManualCredentials = () => {
  const siteID =
    process.env.NETLIFY_BLOBS_SITE_ID ||
    process.env.NETLIFY_SITE_ID ||
    process.env.SITE_ID;

  const token =
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.NETLIFY_ACCESS_TOKEN ||
    process.env.NETLIFY_AUTH_TOKEN;

  return { siteID, token };
};

const getStoreClient = () => {
  const { siteID, token } = getManualCredentials();
  if (siteID && token) {
    return getStore(STORE_NAME, { siteID, token });
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
  const store = getStoreClient();

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: '',
    };
  }

  if (method === 'GET') {
    try {
      const [productLines, updatedAt] = await Promise.all([
        store.get(PRODUCT_LINES_KEY, { type: 'json' }),
        store.get(UPDATED_AT_KEY),
      ]);

      return createResponse(200, {
        productLines: Array.isArray(productLines) ? productLines : null,
        updatedAt: updatedAt || null,
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

    try {
      await Promise.all([
        store.set(PRODUCT_LINES_KEY, JSON.stringify(productLines), {
          contentType: 'application/json',
        }),
        store.set(UPDATED_AT_KEY, String(updatedAt)),
      ]);

      return createResponse(200, {
        ok: true,
        updatedAt,
      });
    } catch (error) {
      return createResponse(500, formatStorageError(error));
    }
  }

  return createResponse(405, {
    error: `Método no permitido: ${method}`,
  });
}
