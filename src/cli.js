const mdLinks = require('../src/index');
const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2);
const caminho = args[0];

const opcoes = {
  validar: args.includes('--validate'),  
  estatisticas: args.includes('--stats'),  
};

function validarLinks(links) {
  const promises = links.map(link => {
    return axios.head(link.href)
      .then(resposta => ({
        ...link,
        status: resposta.status,
        ok: resposta.status >= 200 && resposta.status < 400 ? 'ok' : 'falha',
      }))
      .catch(erro => ({
        ...link,
        status: erro.response ? erro.response.status : null,
        ok: 'falha',
      }));
  });

  return Promise.all(promises);
}

function exibirLinks(links) {
  links.forEach(link => {
    const informacoesStatus = opcoes.validar ? `status: ${link.status}, ok: ${link.ok}` : '';
    console.log(
      `href: ${link.href}\n` +
      `text: ${link.text}\n` +
      `file: ${link.file}\n` +
      `${informacoesStatus}\n`
    );
  });
}

mdLinks(caminho)
  .then(resultado => {
    if (opcoes.validar) {
      return validarLinks(resultado);
    }
    return resultado;
  })
  .then(resultado => {
    if (opcoes.estatisticas) {
      const totalDeLinks = resultado.length;
      const linksUnicos = new Set(resultado.map(link => link.href)).size;
      console.log(`Total: ${totalDeLinks}`);
      console.log(`Únicos: ${linksUnicos}`);
      if (opcoes.validar) {
        const linksValidos = resultado.filter(link => link.ok === 'ok').length;
        const linksQuebrados = resultado.filter(link => link.ok === 'falha').length;
        console.log(`Válidos: ${linksValidos}`);
        console.log(`Quebrados: ${linksQuebrados}`);
      }
    } else {
      exibirLinks(resultado);
    }
  })
  .catch(erro => {
    console.error(erro.message);
  });
