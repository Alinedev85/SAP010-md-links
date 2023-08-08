# Markdown Links

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Instalação](#2-Instalação)
* [3. Uso](#3-Uso)
* [4. Licença](#4-Licença)
* [5. Documentação](#5-Documentação)

***

## 1. Prefácio

O pacote md-links-aaf é uma ferramenta para verificar links em arquivos Markdown. Ele permite que você verifique facilmente os links contidos em seus arquivos Markdown e obtenha informações sobre eles.

## 2. Instalação

Para começar a usar o md-links-aaf, você precisa tê-lo instalado no seu projeto. Para fazer isso, abra o terminal e execute o seguinte comando:

npm i md-links-aaf


## 3. Uso

Após instalar o md-links-aaf, você pode usa-lo no seu projeto da seguinte maneira:

#1- Importe o pacote:

No arquivo JavaScript do seu projeto, importe o pacote usando o require ou import, dependendo do padrão que você está usando:

const mdLinks = require('md-links-aaf'); // CommonJS

import mdLinks from 'md-links-aaf'; // ES6 Modules

#2- Chame a Função:

Use a função mdLinks para verificar os links em um arquivo Markdown:

const markdownFilePath = 'caminho/para/o/seu/arquivo.md'; Substitua pelo caminho real do arquivo .MD

mdLinks(markdownFilePath)
  .then(links => {
    // 'links' é uma lista de objetos com informações sobre os links
    console.log(links);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });




## 4. Licença

Este projeto é licenciado sob a Licença ISC - consulte o arquivo LICENSE para obter mais detalhes.

[Termos de uso](https://github.com/Alinedev85/SAP010-md-links/wiki/02%E2%80%90-License)


## 5. Documentação

Para maiores informações acesse: 

[ Documentação WIKI](https://github.com/Alinedev85/SAP010-md-links/wiki)

[ Documentação npm](https://www.npmjs.com/package/md-links-aaf)

