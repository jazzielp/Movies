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

const getCategoriesPreviw = async () => {
    const categoriesPreviewList = document.querySelector("#categoriesPreviewList");
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY);
    const data = await res.json();

    const genres = data.genres;

    const HtmlGenres = genres.map(genre => {
        return `<div class="category-container">
                <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
                </div>`;
    });
    

    categoriesPreviewList.innerHTML = HtmlGenres.join("");

}

getTrendingMoviesPreview();
getCategoriesPreviw();
