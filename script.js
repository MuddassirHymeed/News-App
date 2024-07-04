const API_KEY = "85680ad9cbd4412da1aca51cde3312aa";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , () => fetchNews('Pakistan'));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data  = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newCardsTemplate = document.getElementById('template-news-cards');
    cardsContainer.innerHTML = '';

    articles.forEach(articles => {
        if (!articles.urlToImage) return;
        const cardClone  = newCardsTemplate.content.cloneNode(true);
        filDataCard(cardClone , articles);
        cardsContainer.appendChild(cardClone);
            
        
    });
}


function filDataCard(cardClone , articles) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-dics');
}
