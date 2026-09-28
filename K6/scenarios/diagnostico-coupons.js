import http from 'k6/http';
import { check } from 'k6';
import encoding from 'k6/encoding';

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';
const API_USER = __ENV.API_USER;
const API_PASSWORD = __ENV.API_PASSWORD;

if (!API_USER || !API_PASSWORD) {
  throw new Error(
    'Credenciais não informadas. Rode com: k6 run -e API_USER=... -e API_PASSWORD=... scenarios/diagnostico-coupons.js'
  );
}

// Diagnóstico rápido: 5 VUs por 15s, apenas para inspecionar
// o status e o corpo das respostas que falharam no teste de carga completo.
export const options = {
  vus: 5,
  duration: '15s',
};

const authHeader = `Basic ${encoding.b64encode(`${API_USER}:${API_PASSWORD}`)}`;

export default function () {
  const params = {
    headers: { Authorization: authHeader },
    timeout: '10s',
  };

  const response = http.get(`${BASE_URL}/wp-json/wc/v3/coupons`, params);

  const ok = check(response, { 'status 200': (r) => r.status === 200 });

  if (!ok) {
    console.log(
      `FALHA - status: ${response.status} | error: ${response.error} | error_code: ${response.error_code} | timings.duration: ${response.timings.duration}ms | body (200 primeiros chars): ${(response.body || '').toString().slice(0, 200)}`
    );
  }
}
