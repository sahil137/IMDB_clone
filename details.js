const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const APIkey = "e6df134c";

const container = document.getElementById("main-container");

window.onload = fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${APIkey}`)
  .then((response) => response.json())
  .then((data) => displayDetails(data));

function displayDetails(data) {
  console.log(data);
  let content = `<div class="left-container">
      <div class="poster-container">
          <img src="${data.Poster}" class="movie-poster">
      </div>
  </div>
  <div div class="right-container">
      <div>
          <h1 class="details-heading">${data.Title}</h1>
      </div>
      <div class = "genre">
      Genre: ${data.Genre}
      </div>
      <div class="actors">
      Actors: ${data.Actors} &nbsp;
      Director: ${data.Director}
      </div>
      <div class="plot">
      <p>Plot: ${data.Plot}</p>
      </div>
      <div class="Release">
      Release Date: ${data.Released}
      </div>
      <div>
      Language: ${data.Language}
      </div>
      <div>
      IMDB rating: ${data.imdbRating}
      </div>

      </div>
      `;
  container.innerHTML = content;
}
