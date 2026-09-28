# UI — Testes automatizados (Cypress)

Testes de interface web da EBAC Shop, usando **Cypress** com o padrão **Page Object Model (POM)**.

## Instalação

```bash
cd UI
npm install
```

## Configuração de credenciais (obrigatório antes de rodar)

As credenciais reais não são versionadas no repositório. Configure antes de rodar:

```bash
cp cypress.env.json.example cypress.env.json
```

Edite `cypress.env.json` e preencha com os valores reais: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `INVALID_PASSWORD` (qualquer senha errada, usada no CT002 de login) e `DUPLICATE_EMAIL` (e-mail de uma conta secundária existente na loja, usada apenas no CT002 de US-0008 para testar duplicidade de e-mail).

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
| CT003 | US-0001 | Impedir mais de 10 unidades do mesmo produto | 🐛 Defeito confirmado (DEF-001) — falha intencional |
| CT002 | US-0004 | Buscar produto existente | ✅ Validado |
| CT003 | US-0004 | Buscar termo sem resultados | ✅ Validado |
| CT001 | US-0008 | Editar dados pessoais com sucesso | ✅ Validado |
| CT002 | US-0008 | Impedir e-mail já utilizado por outra conta | ✅ Validado |

## Conta secundária necessária para o ambiente

O CT002 de US-0008 depende de uma conta secundária cadastrada na loja com o e-mail configurado em `DUPLICATE_EMAIL` (ver `cypress.env.json`). Ela é usada apenas como "e-mail já existente" para validar a regra de unicidade — o teste nunca faz login nela, apenas tenta salvar seu e-mail na conta principal (`ADMIN_EMAIL`), que é sempre revertida ao final pelo `afterEach`.

## Defeitos encontrados

Ver `docs/defeitos.md` para o registro completo. Resumo:

- **DEF-001** — US-0001: o limite de 10 itens por produto no carrinho não é aplicado pela loja (CT003 mantido com falha intencional para documentar o defeito).

## Limpeza de dados de teste

- **`account.cy.js`**: possui um hook `afterEach` que reverte nome, sobrenome, display name e e-mail da conta `ADMIN_EMAIL` para os valores originais após cada teste, independentemente do resultado. Essa proteção foi adicionada após dois incidentes reais durante o desenvolvimento, em que testes anteriores alteraram esses dados e afetaram a execução de specs seguintes (ex.: a saudação verificada em `login.cy.js`).
- **`cart.cy.js`**: os itens adicionados ao carrinho ficam vinculados à sessão de convidado (cookie de sessão do WordPress/WooCommerce). Como o Cypress limpa cookies entre cada teste (test isolation, ativado por padrão), cada execução começa com um carrinho vazio, sem necessidade de limpeza manual adicional.
- **`login.cy.js`** e **`products.cy.js`**: não criam dados persistentes na loja.

## Atenção — fixture de produtos

O terceiro item de `cypress/fixtures/produtos.json` ("Argus All-Weather Tank", cor "Grady") **não corresponde a uma variação real do produto** — a cor correta provavelmente é outra (ex.: "Gray"). Esse item veio assim do projeto reaproveitado e ainda não foi corrigido. Evite usá-lo em novos testes até confirmar as variações reais do produto na loja (inspecionando a página `produtos/argus-all-weather-tank`).
