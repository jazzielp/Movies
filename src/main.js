const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params:{
        "api_key": API_KEY
    }
});

const getTrendingMoviesPreview = async () => {
    const trendingPreviewMovieList = document.querySelector("#trendingPreview-movieList");
    const {data} = await api("/trending/movie/day");
    

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
    const {data} = await api("genre/movie/list");

    const genres = data.genres;

    const HtmlGenres = genres.map(genre => {
        return `<div class="category-container">
                <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
                </div>`;
    });
    

    categoriesPreviewList.innerHTML = HtmlGenres.join("");

}


