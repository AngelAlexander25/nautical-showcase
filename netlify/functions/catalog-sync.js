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

export async function handler(event) {
  const method = event.httpMethod?.toUpperCase() || 'GET';
  const store = getStore(STORE_NAME);

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
