const getTrendingMoviesPreview = async () => {
    const trendingPreviewMovieList = document.querySelector("#trendingPreview-movieList");
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
    const data = await res.json();

    const movies = data.results;
    
    const listMovies = movies.map(movie => {
        return `<div class="movie-container">
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          class="movie-img"
          alt="${movie.title}"
        />
      </div>`
    });

    trendingPreviewMovieList.innerHTML = listMovies.join("");
}

getTrendingMoviesPreview();
