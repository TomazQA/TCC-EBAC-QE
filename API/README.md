# API — Testes automatizados (Supertest)

Testes da **US-0003 — API de cupons**, usando Supertest + Jest, com validação de contrato via AJV.

## Instalação

```bash
cd API
npm install
cp .env.example .env
```

Edite o `.env` com a URL base e as **credenciais reais** de autenticação da API. O arquivo `.env` não é versionado (contém segredos) — apenas o `.env.example`, com placeholders.

## Execução

```bash
npm test
```

## Estrutura

```
API/
├── tests/              # Casos de teste (Jest + Supertest)
│   └── coupons.test.js
├── schemas/            # Contratos (JSON Schema) validados com AJV
│   └── coupon.schema.js
├── utils/              # Helpers de conexão HTTP e autenticação
│   └── apiClient.js
├── .env.example
└── package.json
```

## Casos de teste automatizados

| ID | Caso de teste | Tipo |
|---|---|---|
| CT001 | Criar cupom com dados válidos (contrato validado) | Caminho feliz |
| CT002 | Requisição sem autenticação retorna 401 | Caminho negativo |
| CT003 | Impedir cupom com código duplicado (valida o código de erro específico da API) | Caminho negativo |
| CT007 | Buscar cupom por ID inexistente retorna 404 | Caminho negativo |

## Limpeza de dados de teste

Os cupons criados pelos testes (CT001 e CT003) são removidos automaticamente ao final da suíte, via `afterAll`, usando `DELETE /wp-json/wc/v3/coupons/{id}?force=true`. Isso evita que execuções repetidas acumulem cupons de teste na loja.

A asserção do CT003 verifica status 400 e o código de erro `woocommerce_rest_coupon_code_already_exists`, valor confirmado em execução real contra a loja.
