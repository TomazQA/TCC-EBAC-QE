import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Massa de dados: 5 usuários de teste fornecidos no enunciado do TCC.
// Arquivo usuarios.json não é versionado (contém credenciais reais).
// Copie usuarios.json.example para usuarios.json e preencha as senhas reais.
const usuarios = new SharedArray('usuarios', function () {
  return JSON.parse(open('../data/usuarios.json'));
});

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';

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
    http_req_duration: ['p(95)<3000'], // 95% das requisições abaixo de 3s
    checks: ['rate>0.95'], // pelo menos 95% dos logins devem ser confirmados como bem-sucedidos
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
    redirects: 0, // não seguir o redirect, para inspecionar a resposta de login
  };

  const response = http.post(`${BASE_URL}/wp-login.php`, payload, params);

  // Validação reforçada: nesta loja, o login bem-sucedido responde HTTP 200
  // (sem redirecionamento), então o status sozinho não comprova a
  // autenticação. O que a comprova é o cookie wordpress_logged_in_*, que só
  // é definido quando o login é aceito.
  check(response, {
    'login retornou HTTP 200': (r) => r.status === 200,
    'cookie de sessão autenticada foi definido (login aceito)': (r) =>
      Object.keys(r.cookies || {}).some((name) => name.startsWith('wordpress_logged_in_')),
    'não retornou erro de servidor': (r) => r.status < 500,
  });

  sleep(1);
}

