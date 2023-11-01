async function main() {
  let article = await getArticle(window.location.href);
  reviseStyle();
  removePaywall();
  removeBackgroundColor();
  replaceArticle(article);
}

async function getArticle(url) {
  let html = await fetch(url, {
    credentials: 'include',
    method: 'GET',
    mode: 'cors',
  })
    .then((res) => res.text())
    .then((res) => {
      return res;
    });

  return getMatch(html);
}

function getMatch(html) {
  const regexp = /<section.*?<\/section>/gm;
  const matches = [...html.matchAll(regexp)];

  let articleBody = '';

  for (let i = 0; i < matches.length; ++i) {
    if (matches[i][0].includes('articleBody')) {
      articleBody = matches[i][0];
    }
  }

  return articleBody;
}

function reviseStyle() {
  let el = document.querySelectorAll('[data-testid="vi-gateway-container"]')[0];
  el.style.overflow = 'scroll';
}

function removePaywall() {
  document.querySelector('#gateway-content')?.remove();
}

function removeBackgroundColor() {
  let mask = document.evaluate(
    '/html/body/div[1]/div/div[1]/div[3]',
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (mask !== null) {
    mask.style.background = 'rgba(255,255,255,0)';
  }
}

function replaceArticle(article) {
  let tmp = document.createElement('div');
  tmp.innerHTML = article;

  let oldArticle = document.querySelector('[name="articleBody"]');
  oldArticle.parentNode.replaceChild(tmp.firstChild, oldArticle);
}

window.addEventListener('load', () => {
  setTimeout(main, 3000);
});

// function createButton() {
//   let paywall = document.querySelector('#gateway-content');
//   let button = document.createElement('button');

//   button.textContent = 'remove';
//   paywall.appendChild(button);
// }
