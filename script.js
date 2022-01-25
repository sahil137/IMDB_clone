// Selectors
let searchTextElement = document.getElementById("search-movie-input");
const searchResultContainer = document.getElementById("movie-result-container");
// Event Listeners
searchTextElement.addEventListener("input", searchForMovie);

// functions
const APIkey = "e6df134c";
function searchForMovie() {
  let searchText = searchTextElement.value;
  if (searchText === "") {
    return;
  }
  fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=${APIkey}&page=1`)
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
