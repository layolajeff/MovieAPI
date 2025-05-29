
async function searchMovie() {
  const query = document.getElementById("searchInput").value;
  const apiKey = "d2d06fc3"; 
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  if (data.Response === "True") {
    data.Search.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");
      movieDiv.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}"/>
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      movieDiv.addEventListener("click", () => showMovieDetails(movie.imdbID));
      container.appendChild(movieDiv);
    });
  } else {
    container.innerHTML = `<p>No results found.</p>`;
  }
}