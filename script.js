// Selectors
let searchTextElement = document.getElementById("search-movie-input");
const searchResultContainer = document.getElementById("movie-result-container");
const searchButton = document.getElementById("search-button");
const APIkey = "e6df134c";
// Event Listeners
searchTextElement.addEventListener("input", searchForMovie);
searchResultContainer.addEventListener("click", getMoreDetails);
searchResultContainer.addEventListener("click", addToFavourites);
searchButton.addEventListener("click", searchForMovie);

// functions
// function to search movie using omdb api
function searchForMovie() {
  let searchText = searchTextElement.value;
  if (searchText === "") {
    return;
  }
  fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=${APIkey}&page=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let list = "";
      if (data.Search) {
        data.Search.forEach((movie) => {
          list += `<div class = "movie-item d-flex flex-column align-items-center" id = "${movie.imdbID}">
                <div class = "movie-img">
                    <img src = "${movie.Poster}" alt = "poster">
                </div>
                <div class = "movie-name">
                    <h3>${movie.Title}</h3>
                    <a href = "#" class = "details-button">Get more Details</a>
                </div>
                <button type="submit" class="btn btn-sm btn-outline-primary favourite-button"> Add To Favourites </button>
            </div>`;
        });
      }
      searchResultContainer.innerHTML = list;
    });
}

// function to open details page
function getMoreDetails(event) {
  if (event.target.classList.contains("details-button")) {
    let movie = event.target.parentElement.parentElement;
    const id = movie.id;
    window.open("./details.html" + "?id=" + id);
  }
}

// add movies to favourites list
function addToFavourites(event) {
  // check if user has clicked on favourite button
  // if user has not clicked on favourite button just return
  if (!event.target.classList.contains("favourite-button")) {
    return;
  }

  let movieId = event.target.parentElement.id;
  let favouriteMovies;

  if (localStorage.getItem("favourites") === null) {
    favouriteMovies = [];
  } else {
    favouriteMovies = JSON.parse(localStorage.getItem("favourites"));
  }
  // check if the movieId is already present
  if (favouriteMovies.indexOf(movieId) !== -1) {
    alert("Already in favourites");
    return;
  }
  // add id to array and save it back to local storage
  favouriteMovies.push(movieId);
  localStorage.setItem("favourites", JSON.stringify(favouriteMovies));
}
