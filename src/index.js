const fs = require('fs').promises;
const pathLib = require('path');


function encontrarLinksETexto(dados, arquivo) {
  const regex = /\[([^[\]]+)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
  const correspondencias = dados.match(regex) || [];

  return correspondencias.map((correspondencia) => ({
    href: correspondencia.replace(regex, '$2').trim(),
    text: correspondencia.replace(regex, '$1').trim(),
    arquivo,
  }));
}

function obterLinksDoArquivoMd(arquivo) {
  return fs.readFile(arquivo, 'utf8')
    .then((dados) => encontrarLinksETexto(dados, arquivo));
}

function mdLinks(caminho) {
  const caminhoResolvido = pathLib.resolve(caminho);
  return fs.stat(caminhoResolvido)
    .then((estatisticas) => {
      if (estatisticas.isDirectory()) {
        return fs.readdir(caminhoResolvido)
          .then((arquivos) => {
            const promessas = arquivos.map((arquivo) => obterLinksDoArquivoMd(pathLib.join(caminhoResolvido, arquivo)));
            return Promise.all(promessas)
              .then((arraysDeLinks) => arraysDeLinks.flat());
          });
      } else if (estatisticas.isFile()) {
        return obterLinksDoArquivoMd(caminhoResolvido);
      } else {
        throw new Error('O caminho especificado não é um arquivo ou diretório válido.');
      }
    });
}



module.exports = { mdLinks, obterLinksDoArquivoMd, encontrarLinksETexto };


