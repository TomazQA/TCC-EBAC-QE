# K6 — Testes de Performance

Testes de carga cobrindo dois cenários, conforme exigido no item 4.7 do trabalho:

1. **Login na plataforma** (US-0002) — `scenarios/login.js`
2. **Listagem de cupons via API** (US-0003) — `scenarios/coupons.js`

## Configuração (conforme especificado no enunciado)

- **Usuários virtuais (VUs):** 20
- **Tempo de execução:** 2 minutos
- **Ramp-up:** 20 segundos
- **Massa de dados** (cenário de login): 5 usuários em `data/usuarios.json` (não versionado — ver Configuração de credenciais abaixo)

## Configuração de credenciais (obrigatório antes de rodar)

Os arquivos com credenciais reais não são versionados no repositório, por segurança. Antes de rodar os testes, configure:

```bash
# Massa de dados do cenário de login
cp data/usuarios.json.example data/usuarios.json
# Edite data/usuarios.json e substitua "SUBSTITUA_PELA_SENHA_REAL" pela senha real de cada usuário
```

Os scripts `coupons.js` e `diagnostico-coupons.js` exigem as credenciais da API via variáveis de ambiente (`-e API_USER=... -e API_PASSWORD=...`), sem valor padrão — eles falham imediatamente com uma mensagem clara caso não sejam informadas.

## Instalação do K6

O K6 não é um pacote npm — é um binário. Instale conforme seu sistema operacional:

```bash
# Ubuntu/Debian
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6ACFD8
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

Confirme a instalação:
```bash
k6 version
```

## Execução

```bash
cd K6

# Cenário de login
k6 run scenarios/login.js

# Cenário de cupons (API)
k6 run scenarios/coupons.js
```

Por padrão, os scripts apontam para `http://lojaebac.ebaconline.art.br`. As credenciais da API **precisam** ser passadas via variável de ambiente (sem valor padrão no código):

```bash
k6 run -e BASE_URL=http://localhost:80 scenarios/login.js
k6 run -e API_USER=SEU_USUARIO -e API_PASSWORD='SUA_SENHA' scenarios/coupons.js
```

## Interpretando o resultado

Ao final da execução, o K6 exibe um resumo com métricas como:
- `http_req_duration` — tempo de resposta (média, p90, p95).
- `http_req_failed` — taxa de falhas.
- `checks` — percentual de validações que passaram.

Os limites (`thresholds`) configurados em cada script fazem o K6 retornar um código de saída diferente de 0 caso não sejam atendidos, o que também pode ser usado futuramente em integração contínua.

## Resultados obtidos

Ver `docs/performance.md` para a análise completa, incluindo o critério de sucesso do login, as quatro execuções realizadas e o diagnóstico do cenário de cupons.

| Cenário | VUs | Duração | p95 | Taxa de falha | Status |
|---|---|---|---|---|---|
| Login (US-0002) | 20 | 2min | 2,29 s a 2,89 s | 3,99% a 7,91% (4 execuções) | ⚠️ p95 dentro do limite; taxa de falha acima de 5% nas duas últimas execuções |
| Cupons GET (US-0003) | 20 | 2min | 4,56 s | 40,15% | ❌ Fora do limite |
