
const homePage = () => {
    getTrendingMoviesPreview();
    getCategoriesPreviw();
}

const trendsPage = () => {
    console.log("TRENDS!!");
}

const searchPage = () => {
    console.log("SEARCH!!");
}

const moviePage = () => {
    console.log("MOVIE!!");
}

const categoryPage = () => {
    console.log("CATEGORIRES!!");
} 

const navigator = () => {
    console.log({location});

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    }else if (location.hash.startsWith("#search=")) {
        searchPage();
    }else if (location.hash.startsWith("#movie=")) {
        moviesPage();
    }else if (location.hash.startsWith("#category=")) {
        categoryPage();
    }else{
        homePage();
    }

    location.hash;
}

window.addEventListener("load", navigator,false);
window.addEventListener("hashchange", navigator,false);