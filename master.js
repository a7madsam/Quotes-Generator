const textQuote = document.querySelector(".text");
const author = document.querySelector(".author");
const loader = document.querySelector(".loader");
const container = document.querySelector(".main");
let newQuote = document.querySelector(".new-quote");
let share = document.querySelector(".share");
//get a new quote
async function getQuote() {
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let apiUrl = "https://forismatic-proxy.herokuapp.com/?lang=en&key=123456";
    try {
        loading();
        const responce = await fetch(apiUrl);
        const data = await responce.json();
        console.log(data);
        if (data.author.length) {
            author.innerText = "Unknown";
        } else {
            author.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length >= 150) {
            textQuote.classList.add("long-quote");
        } else {
            textQuote.classList.remove("long-quote");
        }
        textQuote.innerText = data.quoteText;
        complete();
    } catch (e) {
        getQuote();
    }
}
//loading
function loading() {
    loader.hidden = false;
    container.hidden = true;
}
function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        container.hidden = false;
    }
}
//share on twitter
function shareQuote() {
    let textQuoteShare = textQuote.innerText;
    let authorShare = author.innerText;
    let twitterUrl = `https://twitter.com/intent/tweet?text=${textQuoteShare} - ${authorShare}`;
    window.open(twitterUrl, '_blank')
}
getQuote();
newQuote.addEventListener("click", getQuote);
share.addEventListener('click', shareQuote);

