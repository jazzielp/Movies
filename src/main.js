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
    
    const {data} = await api("trending/movie/day");
    

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

    trendingMoviesPreviewList.innerHTML = listMovies.join("");
}

const getCategoriesPreviw = async () => {
   
    const {data} = await api("genre/movie/list");

    const genres = data.genres;

    const HtmlGenres = genres.map(genre => {
        return `<div class="category-container">
                <h3 id="id${genre.id}" data-id=${genre.id} class="category-title">${genre.name}</h3>
                </div>`;
    });


   

    categoriesPreviewList.innerHTML = HtmlGenres.join("");
    const listCategories = document.querySelectorAll(".category-title");
    
    listCategories.forEach( category => {
        category.addEventListener("click", () => {
            const id = category.getAttribute("data-id");
            location.hash = `#category=${id}-${category.innerHTML}`
        });
    });
    

}


const renderMovies = (data, nodo) => {
    const listMovies = data.map(movie => {
        return `
        <div class="movie-container">
            <img
            src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path}"
            class="movie-img"
            alt="${movie.original_title}"
            />
      </div>`;
    });

    nodo.innerHTML = listMovies.join("");
}


const getMoviesByCategory = async (id) => {

    
    const {data} = await api("discover/movie", {
        params: {
            with_genres: id
        }
    });

    const movies = data.results;
    renderMovies(movies, genericSection);
 

}

const getMoviesBySearch = async query => {
    const {data} = await api("search/movie", {
        params:{
            query
        }
    });

    const movies = data.results;
    renderMovies(movies, genericSection);

}

const getTrendingMovies = async () => {
    const {data} =  await api("trending/movie/day");
    const movies = data.results;
   
    renderMovies(movies, genericSection);
}



