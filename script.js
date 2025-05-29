
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
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}" />
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

async function showMovieDetails(imdbID) {
  const apiKey = "d2d06fc3"; 
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  const response = await fetch(url);
  const movie = await response.json();

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" style="width: 200px; float: left; margin-right: 20px;" />
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
    <div style="clear: both;"></div>
  `;

  document.getElementById("movieModal").style.display = "block";
}

function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}