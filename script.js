const apiKey = "43c9be59f5ac42ccacc2adcdd1ae316a";
let Currentquery = "global warming";

async function getNews(query) {
  try {
    console.log('Fetching the news...');

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );
    console.log('Status code:', response.ststus);
    if (!response.ok) throw new Error("Network response was not okay");
    const data = await response.json();
    displayData(data.articles);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
//main function logic
function displayData(articles) {
  let dataContainer = document.querySelector(".data-container");
  dataContainer.innerHTML = "";
  articles.forEach((article) => {
    let dataContent = document.createElement("div");
    dataContent.className = "col py-4 px-4";
    dataContent.innerHTML = `
                <div class="card">
                    <img src="${article.urlToImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title news-url"><a href="${article.url}" target=_blank>${article.title}</a></h5>
                        <p class="card-text description ">${article.description}.</p>
                </div>
            </div>`;
    if (
      !article.url ||
      !article.title ||
      !article.description ||
      !article.urlToImage ||
      article.length <= 0
    )
      return;
    dataContainer.appendChild(dataContent);
  });
}
//initial call with currentquery
getNews(Currentquery);
//searching on button click
document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  searchData();
});
//searching on enter click
document.getElementById("search-text").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchData();
});
//function to search data on (enter or button)click
function searchData() {
  let queryText = document
    .getElementById("search-text")
    .value.trim()
    .toLowerCase();
  if (queryText === "" && !queryText) return;
  //remove the active class on search
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  getNews(queryText || Currentquery);
}

//function to display news on nav clicks
function pageNews(id) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelector(`.nav-item#${id} .nav-link`).classList.add("active");
  getNews(id);
}
