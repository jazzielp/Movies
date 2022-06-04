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

    renderMovies(movies, trendingMoviesPreviewList);
    
   
    
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

const getMovieById = async id => {
    const {data: movie} =  await api(`movie/${id}`);
    renderMovieDetail(movie);
}

const getRelateMoviesById = async id => {
    const {data} =  await api(`movie/${id}/recommendations`);
    const listRelatedMovies = data.results;
    const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');
    
    renderMovies(listRelatedMovies, relatedMoviesContainer);
}

const renderMovies = (data, nodo) => {
    const listMovies = data.map(movie => {
        let htmlMovie;
        if(movie.poster_path === null){
            htmlMovie = `
            <div data-id="${movie.id}" class="movie-container movie-container--Url-isNull">
               <h3>${movie.original_title}</h3>
            </div>`
        }else{
            htmlMovie = `
            <div data-id="${movie.id}" class="movie-container">
                <img
                src=""
                class="movie-img"
                alt="${movie.original_title}"
                data-img ="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                
                />
          </div>`
        }

        return htmlMovie;
    });

    nodo.innerHTML = listMovies.join("");
    addEventClick();
    addIntersectionObs();
  
}

const renderMovieDetail = (movie) => {
    const genresMovie = movie.genres;
    const urlImg = `
    url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`;
    headerSection.style.background = urlImg;
    const htmlMovieDetail = `
        <h1 class="movieDetail-title">${movie.original_title}</h1>
        <span class="movieDetail-score">${movie.vote_average}</span>
        <p class="movieDetail-description">
          ${movie.overview}
        </p>
        <article id="categoriesList" class="categories-list">
        </article>

        <article id="relatedMovies" class="relatedMovies-container">
          <h2 class="relatedMovies-title">Películas similares</h2>
          <div class="relatedMovies-scrollContainer">
          </div>
        
        </article>


        `;

    movieDetailSection.innerHTML = htmlMovieDetail;

    const categoriesList = document.querySelector("#categoriesList");
   
    
    const htmlGenresMovie = genresMovie.map(genre => {
        return ` 
            <div class="category-container">
            <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
            </div> 
        `
    });

    categoriesList.innerHTML = htmlGenresMovie.join("");
    
    getRelateMoviesById(movie.id);
    
    
};

const addEventClick = () => {
    const listImgMovies = document.querySelectorAll(".movie-container");
    listImgMovies.forEach(imgMovie => {
        imgMovie.addEventListener("click", () => {
            const id = imgMovie.getAttribute("data-id");
            location.hash = `#movie=${id}`
        });
    });
}

const loadUrlImg = (entradas) => {

    
     entradas.forEach(element => {
        const urlImg = element.target.getAttribute("data-img");
        
        if(element.isIntersecting){
            element.target.src = urlImg;
        }
        
     });

}

const fntObserver = new IntersectionObserver(loadUrlImg);



const addIntersectionObs = () => {
    const listImg = document.querySelectorAll(".movie-img");
    
    listImg.forEach( image => {
        
        fntObserver.observe(image);
    });
}







