const API_KEY = "85680ad9cbd4412da1aca51cde3312aa";
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

window.addEventListener('load' , () => fetchNews('Pakistan'));

function reload(){
    window.location.reload();
}

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


function filDataCard(cardClone , article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone :'Asia/Jakarta'
    });


        newsSource.innerHTML = `${article.source.name} . ${date}`;
        cardClone.firstElementChild.addEventListener('click',() =>{
            window.open(article.url , "_blank");
        })
    
}


let curSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav =null;
})

