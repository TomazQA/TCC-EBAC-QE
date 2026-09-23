import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

describe('US-0001 - Adicionar item ao carrinho', () => {
  beforeEach(() => {
    ProductsPage.visitarUrl();
  });

  it('CT001 - deve adicionar produto ao carrinho usando massa de dados', () => {
    cy.fixture('produtos').then((produtos) => {
      const produto = produtos[0];

      ProductsPage.buscarProduto(produto.nomeProduto);
      CartPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);

      CartPage.getSuccessMessage().should('contain', produto.nomeProduto);
    });
  });

  it('CT003 - não deve permitir adicionar mais de 10 unidades do mesmo produto', () => {
    cy.fixture('produtos').then((produtos) => {
      const produto = produtos[0];

      ProductsPage.buscarProduto(produto.nomeProduto);
      CartPage.addProdutoCarrinho(produto.tamanho, produto.cor, 11);

      CartPage.getErrorMessage().should('exist');
    });
  });
});
