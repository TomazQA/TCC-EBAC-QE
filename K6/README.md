# K6 - Testes de Performance

Testes de carga cobrindo dois cenarios, conforme exigido no item 4.7 do trabalho:

1. Login na plataforma (US-0002) - scenarios/login.js
2. Listagem de cupons via API (US-0003) - scenarios/coupons.js

Tambem ha um script de diagnostico: scenarios/diagnostico-coupons.js, usado para investigar a causa das falhas encontradas no cenario de cupons (ver docs/performance.md).

## Configuracao

- Usuarios virtuais (VUs): 20
- Tempo de execucao: 2 minutos
- Ramp-up: 20 segundos
- Massa de dados: 5 usuarios em data/usuarios.json

## Instalacao do K6

Comandos de instalacao (Ubuntu/Debian):

curl -fsSL https://dl.k6.io/key.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/k6-archive-keyring.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

Confirme a instalacao com: k6 version

## Execucao

cd K6
k6 run scenarios/login.js
k6 run scenarios/coupons.js

Por padrao, os scripts apontam para http://lojaebac.ebaconline.art.br. Para rodar contra outro ambiente, sobrescreva as variaveis:

k6 run -e BASE_URL=http://localhost:80 scenarios/login.js

## Resultados obtidos

Ver docs/performance.md para a analise completa.

| Cenario | VUs | Duracao | p95 (ms) | Taxa de falha | Status |
|---|---|---|---|---|---|
| Login (US-0002) | 20 | 2min | 2290 | 4,30% | Dentro do limite |
| Cupons GET (US-0003) | 20 | 2min | 4560 | 40,15% | Fora do limite |
