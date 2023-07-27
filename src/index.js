const fs = require('fs').promises;
const axios = require('axios');

function readFile(data) {
  const regex = /(?:(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)|\[(.+?)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/gi;
  const matches = data.match(regex) || [];
  return matches.map((match) => {
    const linkRegex = /\[(.+?)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/i;
    const [,text, href] = linkRegex.exec(match) || [];
    return {
      href: href || match,
      text: text || '',
    };
  });
}

function validateLink(link, followRedirects = false) {
  return axios.head(link.href, { maxRedirects: followRedirects ? 5 : 0 })
    .then((response) => ({
      ...link,
      status: response.status,
      ok: response.status >= 200 && response.status < 400,
      statusText: response.statusText,
    }))
    .catch((error) => ({
      ...link,
      status: error.response ? error.response.status : null, 
      ok: false,
      statusText: error.response ? error.response.statusText : ' error',
    }));
}

module.exports = { readFile, validateLink, };