//URLs
const ApiKey = "api_key=1cf50e6248dc270629e802686245c2c8";
const BaseUrl = "https://api.themoviedb.org/3";
const ImgUrl = "https://image.tmdb.org/t/p/w300";
const PopMovieUrl = BaseUrl + "/movie/popular?" + ApiKey;
const SearchUrl = BaseUrl + "/search/multi?" + ApiKey + "&query=";
const PopTvUrl = BaseUrl +"/trending/tv/week?"+ ApiKey;
const UpcomingMovieUrl = BaseUrl + "/movie/upcoming?" + ApiKey;
const UpcomingUrl = BaseUrl + "/movie/upcoming?" + ApiKey;

//get elements
const mainContainer = document.querySelector('.mainContainer');
const upcomingMovie = document.querySelector('.upcomingMovie');
const topMovies = document.querySelector(".topMovies");
const topTvs = document.querySelector('.topTvs');
const form = document.querySelector('#form');
const ComingsoonMov = document.querySelector(".ComingsoonMov");
var mybutton = document.getElementById("topBtn");


//function

// When the user scrolls down 50px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//responsive
function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}

//get upcoming movies
getUpcoming(UpcomingUrl);
async function getUpcoming(url) {
  const res = await fetch(url);
  const data = await res.json();
  upcomingDispaly(data.results);
}

//show upcoming movies 
function upcomingDispaly(data){ 
  ComingsoonMov.innerHTML = '';
  const firstComing = data[0]
  const upcomingPoster = ImgUrl + firstComing.backdrop_path;
  const upcominTtitle = firstComing.title;
  const upcominRrate = firstComing.vote_average
  const upcomingId = firstComing.id 
  const upcomingOverview = firstComing.overview
  const upcDate = firstComing.release_date
  const upcomingMovieEl = document.createElement('div');
  upcomingMovieEl.classList.add('upcomingMovie');
  upcomingMovieEl.innerHTML = `
    <div class = "leftBtn">
    <button style="font-size:24px"><i class="fa fa-angle-left"></i></button>
  </div>
  <div class="upCposter">
    <img src="${upcomingPoster}" alt="${upcominTtitle}" 
    title="${upcominTtitle}" >
  </div>
  <div class="upComingMovInfo">
    <div class = "upCtitle">Title: ${upcominTtitle}</div>
    <div class="upCrate">Rated: ${upcominRrate}</div> 
    <div class="upCdate">Release date: ${upcDate}</div>
    <div class="upCoverview">Overview:</div>
    <div class="upCoverviewtext">${upcomingOverview}</div>
  </div>
  <div class = "rightBtn">
    <button style="font-size:24px"><i class="fa fa-angle-right"></i></button>
  </div>
  `;

  ComingsoonMov.appendChild(upcomingMovieEl);
}

// Get popular movies
getMovies(PopMovieUrl);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

//get Tv shows 
getTvs(PopTvUrl);
async function getTvs(url) {
  const res = await fetch(url);
  const data = await res.json();
  showTvs(data.results);
}

function showMovies(movies) {  
  topMovies.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date, id } = movie;

    const date = new Date(release_date)
    const movieYear = date.getFullYear()

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${ImgUrl + poster_path}" alt="${title}" title="${title}" />
      <div class="movie-info"> 
        <h5 class="date"> ${movieYear}</h5>
        <span class="fa fa-star checked"></span>
        <h5 class="rate">  ${vote_average} </h5>
        <h5 class="movtitle"> ${title} </h5>
        <button class="play">Watch Now</button>
      </div>
    `;

    topMovies.appendChild(movieEl);
  });
}

// dispaly tv shows
function showTvs(tvs) {  
  topTvs.innerHTML = '';
  tvs.forEach((tv) => {
    const { name, poster_path, vote_average, first_air_date, id } = tv;
    const date = new Date(first_air_date)
    const movieYear = date.getFullYear() 
    const tvEl = document.createElement('div');
    tvEl.classList.add('tv');
    tvEl.innerHTML = 
      `
      <img src="${ImgUrl + poster_path}" alt="${name}" title="${name}" />
      <div class="tv-info">
        <h5 class="date"> ${movieYear}</h5>
        <span class="fa fa-star checked"></span>
        <h5 class="rate">  ${vote_average} </h5>
        <h5 class="movtitle"> ${name} </h5>
        <button class="play">Watch Now</button>
      </div>
    `;

    topTvs.appendChild(tvEl);
  });
}

//search
const movieSearchResult = document.querySelector(".movie-search-result");
const tvSearchResult = document.querySelector(".tv-search-result");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    window.location.href = 'search.html';
    multSearch(SearchUrl + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

async function multSearch(url) {
  const res = await fetch(url);
  const data = await res.json();
  showSearchResult(data.results);
    
}

function showSearchResult(results) {  
  movieSearchResult.innerHTML = '';
  results.forEach((result) => {
    const { title, poster_path, vote_average, overview, release_date, id } = result;

    const date = new Date(release_date)
    const movieYear = date.getFullYear()

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${ImgUrl + poster_path}" alt="${title}" title="${title}" />
      <div class="movie-info"> 
        <h5 class="date"> ${movieYear}</h5>
        <span class="fa fa-star checked"></span>
        <h5 class="rate">  ${vote_average} </h5>
        <h5 class="movtitle"> ${title} </h5>
        <button class="play">Watch Now</button>
      </div>
    `;

    movieSearchResult.appendChild(movieEl);
  });
}

