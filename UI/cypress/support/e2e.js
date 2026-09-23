// Arquivo de suporte carregado antes de cada spec.
import './commands';

Cypress.on('uncaught:exception', () => {
  // Evita que erros de JS da própria loja (fora do nosso controle)
  // derrubem os testes. Ajustar conforme necessário durante a execução real.
  return false;
});
