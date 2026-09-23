import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const usuarios = new SharedArray('usuarios', function () {
  return JSON.parse(open('../data/usuarios.json'));
});

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<3000'],
  },
};

export default function () {
  const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];

  const payload = {
    log: usuario.username,
    pwd: usuario.password,
    'wp-submit': 'Log In',
    redirect_to: `${BASE_URL}/minha-conta/`,
    testcookie: '1',
  };

  const params = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    redirects: 0,
  };

  const response = http.post(`${BASE_URL}/wp-login.php`, payload, params);

  check(response, {
    'login processado (200 ou 302)': (r) => r.status === 200 || r.status === 302,
    'não retornou erro de servidor': (r) => r.status < 500,
  });

  sleep(1);
}
