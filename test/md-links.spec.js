const fs = require('fs').promises;
const { encontrarLinksETexto } = require('../src/index.js');

describe('Testes para funções de extração de links', () => {
  test('encontrarLinksETexto retorna os links e textos corretos', () => {
    const dados = `
    [Investing](https://www.investing.com/economic-calendar/)
    [InfoMoney](https://www.infomoney.com.br/)
    [google](https://www.google.com.br/)
    `;
    const arquivo = 'files.md';
    const resultado = encontrarLinksETexto(dados, arquivo);

    expect(resultado).toEqual([
      {
        href: 'https://www.investing.com/economic-calendar/',
        text: 'Investing',
      
      },
      {
        href: 'https://www.infomoney.com.br/',
        text: 'InfoMoney',
      
      },
      {
        href: 'https://www.google.com.br/',
        text: 'google',
       
      },
    ]);
  });

 