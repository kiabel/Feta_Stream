//Your tmdb api key here
const ApiKey = "api_key=1cf50e6248dc270629e802686245c2c8";
const BaseUrl = "https://api.themoviedb.org/3";
const ImgUrl = "https://image.tmdb.org/t/p/w300";
const PopMovieUrl = BaseUrl + "/discover/movie?" + ApiKey + "&language=en-US&sort_by=popularity.desc&page=1&with_watch_monetization_types=free";
const SearchURL = BaseUrl + "/search/movie?" + ApiKey;
const TvUrl = BaseUrl +"/trending/tv/week?"+ ApiKey;
const UpcomingUrl = BaseUrl + "/movie/upcoming?" + ApiKey;

//Elems
const comingsoonMov = document.getElementsByClassName("ComingsoonMov");
const popularMovies = document.getElementsByClassName("popularMovies");
const popularTv = document.getElementsByClassName("popularTv");
const search = document.getElementById('idsearch');



getUpcoming(UpcomingUrl);
function getUpcoming(url){
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)  
    if(data.results.length !== 0){
      upcomingDispaly(data.results)             
    }

    else{
      popularMovies.innerHTML= `<h1 class="no-results">No Results Found</h1>`
    }
  })
}

function upcomingDispaly(data){
  for (let i = 0; i < 1; i++) {
    const upcPosterFullUrl = ImgUrl + data[1].backdrop_path;
    const upctitle = data[0].title;
    const upcrate = data[0].vote_average
    const upcid = data[0].id 
    const upcoverview = data[0].overview
    const upcDate = data[0].release_date
    const upcView = 
    `<div class="upcomingMovie">

      <div class = "left">
        <button style="font-size:24px"><i class="fa fa-angle-left"></i></button>
      </div>

      <div class="upCposter">
        <img src="${upcPosterFullUrl}" alt="${upctitle}" 
        title="${upctitle}" >
      </div>

      <div class"upCinfo">
        <div class = "upCtitle">Title: ${upctitle}</div>
        <div class="upCrate">Rated: ${upcrate}</div> 
        <div class="upCdate">Release date: ${upcDate}</div>
        <div class="upCoverview">Overview: <p>${upcoverview}</p></div>
      </div>

      <div class = "right">
        <button style="font-size:24px"><i class="fa fa-angle-right"></i></button>
      </div>
      
    </div>` 

    $(upcView).appendTo(comingsoonMov); 
  }
}

//funs
getMovies(PopMovieUrl)
function getMovies(url){
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data.results)
  
    if(data.results.length !== 0){    
    desplayMovies(data.results)
    }
    else{
      popularMovies.innerHTML= `<h1 class="no-results">No Results Found</h1>`
    }
  })
}

function desplayMovies(data){
  for (let i = 0; i < data.length; i++) {
    const posterFullUrl = ImgUrl + data[i].poster_path;
    const movieTitle = data[i].title;
    const movieRate = data[i].vote_average
    const movieId = data[i].id 
    const movieOverview = data[i].overview
    const movieDate = data[i].release_date
    const date = new Date(movieDate)
    const movieYear = date.getFullYear()

    const movView = 
    `<div class="movie">
      <div class="poster">
        <img src="${posterFullUrl}" alt="${movieTitle}" title="${movieTitle}" >
      </div>

      <div class"info">
        <span class="fa fa-star checked"></span>
        <span class="rate">${movieRate}</span> 
        <span class="date">${movieYear}</span>
        <div class = "movIdT">${movieTitle}</div>
        <button class="play">Watch Now</button>
      </div>
      
    </div>` 

    $(movView).appendTo(popularMovies);       
  }
}
getTv(TvUrl);
function getTv(url){
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data.results)
  
    if(data.results.length !== 0){    
    desplayTv(data.results)
    }
    else{
      popularMovies.innerHTML= `<h1 class="no-results">No Results Found</h1>`
    }
  })
}

function desplayTv(data){
  for (let i = 0; i < data.length; i++) {
    const posterFullUrl = ImgUrl + data[i].poster_path;
    const movieTitle = data[i].name;
    const movieRate = data[i].vote_average
    const movieId = data[i].id 
    const movieOverview = data[i].overview
    const movieDate = data[i].first_air_date
    const date = new Date(movieDate);
    const movieYear = date.getFullYear();

    const tvView = 
    `<div class="tv">
      <div class="poster">
        <img src="${posterFullUrl}" alt="${movieTitle}" title="${movieTitle}" >
      </div>

      <div class"info">
        <span class="fa fa-star checked"></span>
        <span class="rate">${movieRate}</span> 
        <span class="date">${movieYear}</span>
        <h5 class = "movIdT">${movieTitle}</h5>
        <button class="play">Watch Now</button>
      </div>      
    </div>` 
          
    $(tvView).appendTo(popularTv);      
  }
}


//Search
