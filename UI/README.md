# UI — Testes automatizados (Cypress)

Testes de interface web da EBAC Shop, usando **Cypress** com o padrão **Page Object Model (POM)**.

## Instalação

```bash
cd UI
npm install
```

## Execução

```bash
# Modo interativo (recomendado durante o desenvolvimento dos testes)
npm run cy:open

# Modo headless (usado na integração contínua)
npm run cy:run
```

## Estrutura

```
UI/
├── cypress/
│   ├── e2e/              # Specs de teste (organizados por história de usuário)
│   ├── pages/             # Page Objects (um por tela/funcionalidade)
│   ├── fixtures/           # Massa de dados de teste
│   └── support/            # Comandos customizados e configurações globais
├── cypress.config.js
└── package.json
```

## Testing Pattern

Utilizamos o **Page Object Model**: cada página/tela da loja tem uma classe correspondente em `cypress/pages/`, que encapsula os seletores e as ações possíveis naquela tela. Os specs em `cypress/e2e/` usam essas classes, sem acessar seletores diretamente.

## Origem dos seletores

Os seletores de `LoginPage.js`, `ProductsPage.js`, `CartPage.js` e os métodos `editarDetalhes` de `AccountPage.js` foram **portados e validados de um projeto anterior**, rodado contra a loja real (lojaebac.ebaconline.art.br), reaproveitado do Trabalho de Consolidação do Módulo 19.

Já os métodos marcados com o comentário `NOVO` em cada Page Object (`buscarProdutoSemResultado`, `getErrorMessage` do carrinho, `editarEmail`/`getErrorMessage` da conta) **ainda não foram validados contra a loja real** — cobrem cenários negativos que o projeto anterior não tinha. Ao rodar pela primeira vez, os seletores e as mensagens esperadas provavelmente vão precisar de ajuste.

## Casos de teste automatizados

| ID | História | Caso de teste | Status |
|---|---|---|---|
| CT001 | US-0002 | Login com credenciais válidas | ✅ Validado |
| CT002 | US-0002 | Login com senha incorreta | ✅ Validado |
| CT001 | US-0001 | Adicionar produto ao carrinho (com variação) | ✅ Validado |
| CT003 | US-0001 | Impedir mais de 10 unidades do mesmo produto | ⚠️ Precisa validar |
| CT001 | US-0004 | Buscar produto existente | ✅ Validado |
| CT003 | US-0004 | Buscar termo sem resultados | ⚠️ Precisa validar |
| CT001 | US-0008 | Editar dados pessoais com sucesso | ✅ Validado |
| CT002 | US-0008 | Impedir e-mail já utilizado por outra conta | ⚠️ Precisa validar |
