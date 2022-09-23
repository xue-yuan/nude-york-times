var intervalId = null;
var counter = 0;

intervalId = setInterval(() => {
    if (counter === 10) {
        clearInterval(intervalId);
        return;
    }

    counter++;
    let gateway = document.getElementById('gateway-content');
    if (gateway !== null) {
        document.getElementById('gateway-content')?.remove();
    }

    let article = document.evaluate(
        '/html/body/div/div/div',
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    if (article !== null) {
        article.style.overflow = 'scroll';
    }

    let shadowBox = document.evaluate(
        '/html/body/div/div/div/div[3]',
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    if (shadowBox !== null) {
        shadowBox?.remove();
    }

}, 2000);
