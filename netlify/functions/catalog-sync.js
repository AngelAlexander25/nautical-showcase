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

const getStoreClient = () => {
  try {
    return getStore(STORE_NAME);
  } catch (error) {
    if (error?.name !== 'MissingBlobsEnvironmentError') {
      throw error;
    }

    const siteID =
      process.env.NETLIFY_BLOBS_SITE_ID ||
      process.env.NETLIFY_SITE_ID ||
      process.env.SITE_ID;

    const token =
      process.env.NETLIFY_BLOBS_TOKEN ||
      process.env.NETLIFY_ACCESS_TOKEN ||
      process.env.NETLIFY_AUTH_TOKEN;

    if (!siteID || !token) {
      throw new Error(
        'Blobs no configurado. Define NETLIFY_BLOBS_SITE_ID (o NETLIFY_SITE_ID) y NETLIFY_BLOBS_TOKEN.'
      );
    }

    return getStore(STORE_NAME, { siteID, token });
  }
};

export async function handler(event) {
  const method = event.httpMethod?.toUpperCase() || 'GET';

  let store;
  try {
    store = getStoreClient();
  } catch (error) {
    return createResponse(500, {
      error: error instanceof Error ? error.message : 'No se pudo inicializar almacenamiento',
    });
  }

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: '',
    };
  }

  if (method === 'GET') {
    const [productLines, updatedAt] = await Promise.all([
      store.get(PRODUCT_LINES_KEY, { type: 'json' }),
      store.get(UPDATED_AT_KEY),
    ]);

    return createResponse(200, {
      productLines: Array.isArray(productLines) ? productLines : null,
      updatedAt: updatedAt || null,
    });
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
  }

  return createResponse(405, {
    error: `Método no permitido: ${method}`,
  });
}
