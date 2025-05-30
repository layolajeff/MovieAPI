// d2d06fc3 const apiKey = "d2d06fc3"; 


async function searchMovie() {
  const query = document.getElementById("searchInput").value;
  const type = document.getElementById("typeFilter").value;
  const apiKey = "d2d06fc3"; 
  const sortOrder = document.getElementById("sortOrder").value;
  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  if (!query) return;

  let url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
  if (type) {
    url += `&type=${type}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      let movies = data.Search;

      
      if (sortOrder !== "none") {
        movies.sort((a, b) => {
          const yearA = parseInt(a.Year.match(/\d{4}/)); 
          const yearB = parseInt(b.Year.match(/\d{4}/));
          return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
        });
      }

      movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const poster = document.createElement("img");
        poster.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";
        poster.alt = movie.Title;

        const title = document.createElement("h3");
        title.textContent = movie.Title;

        const year = document.createElement("p");
        year.textContent = movie.Year;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(year);

        movieDiv.addEventListener("click", () => showMovieDetails(movie.imdbID));
        container.appendChild(movieDiv);
      });
      
    } else {
      const message = document.createElement("p");
      message.textContent = "No results found.";
      container.appendChild(message);
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}