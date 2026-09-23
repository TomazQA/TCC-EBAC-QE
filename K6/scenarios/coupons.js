import http from 'k6/http';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';
const API_USER = __ENV.API_USER || 'admin_ebac';
const API_PASSWORD = __ENV.API_PASSWORD || '@admin!&b@c!2022';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
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
