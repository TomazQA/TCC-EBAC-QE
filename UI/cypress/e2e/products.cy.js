import ProductsPage from '../pages/ProductsPage';

describe('US-0004 - Catálogo de Produtos', () => {
  beforeEach(() => {
    ProductsPage.visitarUrl();
  });

  // CT002 - Caminho feliz: buscar produto existente
  // Baseado e validado em execução real (teste-ebac-ui/produtos.cy.js)
  it('CT002 - deve buscar um produto com sucesso', () => {
    const produto = 'Zeppelin Yoga Pant';

    ProductsPage.buscarProduto(produto);

    cy.get('.product_title').should('contain', produto);
  });

  // CT003 - Caminho negativo: buscar termo sem correspondência
  // NOVO - não existia no projeto original. Seletor/mensagem de "nenhum
  // resultado" ainda não validado - ajustar ao rodar pela primeira vez.
  it('CT003 - deve exibir mensagem ao buscar termo sem resultados', () => {
    const termoAleatorio = 'zzzxyzinexistente123';

    ProductsPage.buscarProdutoSemResultado(termoAleatorio);

    cy.get('body').should('contain.text', 'Nenhum produto foi encontrado');
  });
});
