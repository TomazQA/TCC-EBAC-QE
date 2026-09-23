# Registro de Defeitos — EBAC Shop

Defeitos encontrados durante a execução dos testes manuais e automatizados, documentados conforme identificados.

---

## DEF-001 — Limite de 10 itens por produto não é aplicado no carrinho

- **História relacionada:** US-0001 — Adicionar item ao carrinho
- **Severidade:** Média
- **Caso de teste:** CT003
- **Ambiente:** http://lojaebac.ebaconline.art.br/
- **Data:** 22/09/2026

**Regra de negócio violada:**
> "Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho."

**Passos para reproduzir:**
1. Acessar a página do produto "Aero Daily Fitness Tee".
2. Selecionar a variação Size: XS, Color: Black.
3. Definir a quantidade como 11.
4. Clicar em "Comprar".

**Resultado esperado:**
O sistema deveria bloquear a adição e exibir uma mensagem informando o limite de 10 itens por produto.

**Resultado obtido:**
O sistema aceitou a adição normalmente, exibindo a mensagem de sucesso "11 × 'Aero Daily Fitness Tee' foram adicionados no seu carrinho." O carrinho passou a exibir 11 itens, totalizando R$264,00.

**Evidência:**
Teste automatizado `UI/cypress/e2e/cart.cy.js` (CT003), mantido intencionalmente com falha para documentar o defeito.

**Status:** Aberto
