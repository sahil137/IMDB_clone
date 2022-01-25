const favouriteMovieContainer = document.getElementById("movies-container");
const APIkey = "e6df134c";

// Event Listeners
document.addEventListener("DOMContentLoaded", getFavouriteMeals);
favouriteMovieContainer.addEventListener("click", removeFromFavourites);

// Functions
// fetches and displays all favourite movies
function getFavouriteMeals() {
  let favouriteMovieId;

  if (localStorage.getItem("favourites") === null) {
    favouriteMovieId = [];
    return;
  } else {
    favouriteMovieId = JSON.parse(localStorage.getItem("favourites"));
  }

  let content = "";
  // loop over each meal ID and fetch for movies
  favouriteMovieId.forEach((movieId) => {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${APIkey}`)
      .then((response) => response.json())
      .then((data) => addfavouriteMovies(data, content));
  });
}

// helper funtion that appends favourite movie to container
function addfavouriteMovies(data, content) {
  content += `<div class = "movie-item d-flex flex-column align-items-center" id = "${data.imdbID}">
                <div class = "movie-img">
                    <img src = "${data.Poster}" alt = "poster">
                </div>
                <div class = "movie-name">
                    <h3>${data.Title}</h3>
                </div>
                <button type="submit" class="btn btn-sm btn-outline-primary unfavourite-button"> Remove from Favourites </button>
            </div>`;
  favouriteMovieContainer.innerHTML += content;
}

// to remove favourites from local storage
function removeFromFavourites(event) {
  if (!event.target.classList.contains("unfavourite-button")) {
    return;
  }
  // if unfavourite button is clicked get id of parent
  let favouriteMeal = event.target.parentElement;
  console.log(favouriteMeal);
  let mealId = favouriteMeal.id;
  let favouriteMealsId = JSON.parse(localStorage.getItem("favourites"));

  // find the id in the array of all favourite movies
  let idx = favouriteMealsId.indexOf(mealId);

  // remove the id from the array and save array in local storage
  favouriteMealsId.splice(idx, 1);
  localStorage.setItem("favourites", JSON.stringify(favouriteMealsId));

  // remove favourite meal element
  favouriteMeal.remove();
}
