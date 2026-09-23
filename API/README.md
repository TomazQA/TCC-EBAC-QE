# API — Testes automatizados (Supertest)

Testes da **US-0003 — API de cupons**, usando Supertest + Jest, com validação de contrato via AJV.

## Instalação

```bash
cd API
npm install
cp .env.example .env
```

Edite o `.env` com a URL base e as credenciais de autenticação da API, caso sejam diferentes do padrão de testes.

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
| CT004 | Impedir cupom com código duplicado | Caminho negativo |
| CT007 | Buscar cupom por ID inexistente retorna 404 | Caminho negativo |
