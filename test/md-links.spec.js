const { encontrarLinksETexto, obterLinksDoArquivoMd, mdLinks } = require('../src/index.js');
const fs = require('fs');


test('encontrarLinksETexto lê o conteúdo de um arquivo .md e retorna os links', () => {
  const arquivo = 'test/files-test.md';
  const dados = fs.readFileSync(arquivo, 'utf-8');

  const resultado = encontrarLinksETexto(dados, arquivo);

  expect(resultado).toEqual([
    {
      href: 'https://www.investing.com/economic-calendar/',
      text: 'Investing',
      arquivo: arquivo,
    },
    {
      href: 'https://www.infomoney.com.br/',
      text: 'InfoMoney',
      arquivo: arquivo,
    },
    {
      href: 'https://www.google.com.br/',
      text: 'google',
      arquivo: arquivo,
    },
  ]);
});

test('obterLinksDoArquivoMd retorna os links corretos do arquivo', () => {
  const arquivo = 'test/files-test.md';

  return obterLinksDoArquivoMd(arquivo).then(resultado => {
    expect(resultado).toEqual([
      {
        href: 'https://www.investing.com/economic-calendar/',
        text: 'Investing',
        arquivo,
      },
      {
        href: 'https://www.infomoney.com.br/',
        text: 'InfoMoney',
        arquivo,
      },
      {
        href: 'https://www.google.com.br/',
        text: 'google',
        arquivo,
      },
    ]);
  });
});

test('mdLinks retorna um array de links e caminho completo dos arquivos ', () => {
  const caminho = './test';

  return mdLinks(caminho).then((arraysDeLinks) => {
    expect(arraysDeLinks).toEqual([
      {
        href: 'https://www.investing.com/economic-calendar/',
        text: 'Investing',
        arquivo: 'C:\\Users\\user\\Documents\\GitHub\\SAP010-md-links\\test\\files-test.md',
      },
      {
        href: 'https://www.infomoney.com.br/',
        text: 'InfoMoney',
        arquivo: 'C:\\Users\\user\\Documents\\GitHub\\SAP010-md-links\\test\\files-test.md',
      },
      {
        href: 'https://www.google.com.br/',
        text: 'google',
        arquivo: 'C:\\Users\\user\\Documents\\GitHub\\SAP010-md-links\\test\\files-test.md',
      },
    ]);
  });
});
