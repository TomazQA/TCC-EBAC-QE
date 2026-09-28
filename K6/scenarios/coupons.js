import http from 'k6/http';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';
const API_USER = __ENV.API_USER;
const API_PASSWORD = __ENV.API_PASSWORD;

if (!API_USER || !API_PASSWORD) {
  throw new Error(
    'Credenciais não informadas. Rode com: k6 run -e API_USER=... -e API_PASSWORD=... scenarios/coupons.js'
  );
}

// Configuração exigida no enunciado:
// - 20 usuários virtuais
// - Tempo de execução total: 2 minutos
// - Ramp-up: 20 segundos
export const options = {
  stages: [
    { duration: '20s', target: 20 }, // ramp-up até 20 VUs
    { duration: '1m40s', target: 20 }, // carga sustentada até completar 2min
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'], // menos de 5% de falhas
    http_req_duration: ['p(95)<2000'], // 95% das requisições abaixo de 2s
  },
};

const authHeader = `Basic ${encoding.b64encode(`${API_USER}:${API_PASSWORD}`)}`;

export default function () {
  const params = {
    headers: { Authorization: authHeader },
  };

  const response = http.get(`${BASE_URL}/wp-json/wc/v3/coupons`, params);

  check(response, {
    'status 200': (r) => r.status === 200,
    'retornou uma lista': (r) => {
      try {
        return Array.isArray(JSON.parse(r.body));
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);
}
