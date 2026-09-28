import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

describe('US-0001 - Adicionar item ao carrinho', () => {
  beforeEach(() => {
    ProductsPage.visitarUrl();
  });

  // CT001 - Caminho feliz: adicionar produto ao carrinho com variação
  // Baseado e validado em execução real (teste-ebac-ui/produtos.cy.js)
  it('CT001 - deve adicionar produto ao carrinho usando massa de dados', () => {
    cy.fixture('produtos').then((produtos) => {
      const produto = produtos[0]; // Aero Daily Fitness Tee, XS, Black, 3un.

      ProductsPage.buscarProduto(produto.nomeProduto);
      CartPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);

      CartPage.getSuccessMessage().should('contain', produto.nomeProduto);
    });
  });

  // CT003 - Caminho negativo: impedir mais de 10 unidades do mesmo produto
  //
  // DEFEITO CONFIRMADO (DEF-001, ver docs/defeitos.md): a loja aceitou 11
  // unidades do mesmo produto sem bloqueio, exibindo mensagem de sucesso
  // e refletindo 11 itens no carrinho (R$264,00). A regra de negócio da
  // US-0001 ("não é permitido inserir mais de 10 itens de um mesmo
  // produto") não está implementada. Este teste é mantido conforme a
  // regra especificada e permanece falhando intencionalmente até o
  // defeito ser corrigido - documentar essa falha no relatório do TCC.
  it('CT003 - não deve permitir adicionar mais de 10 unidades do mesmo produto', () => {
    cy.fixture('produtos').then((produtos) => {
      const produto = produtos[0];

      ProductsPage.buscarProduto(produto.nomeProduto);
      CartPage.addProdutoCarrinho(produto.tamanho, produto.cor, 11);

      CartPage.getErrorMessage().should('exist');
    });
  });
});
