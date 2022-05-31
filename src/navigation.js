
const homePage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");

    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");



    getTrendingMoviesPreview();
    getCategoriesPreviw();
}

const trendsPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
   getTrendingMovies();
   headerCategoryTitle.innerHTML = "Trending";
   window.scroll(0,0);

}

const searchPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);
}

const movieDetallePage = () => {
    headerSection.classList.add("header-container--long");
    // headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");

    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");
    const [_, movieId] = location.hash.split("=");
    getMovieById(movieId);
    window.scroll(0,0);
    
}

const categoryPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [_, categoryData] = location.hash.split("=");
    const [categoryId, categoryName] = categoryData.split("-");
    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);

    window.scroll(0,0);
} 

const navigator = () => {
   

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    }else if (location.hash.startsWith("#search=")) {
        searchPage();
    }else if (location.hash.startsWith("#movie=")) {
        movieDetallePage();
    }else if (location.hash.startsWith("#category=")) {
        categoryPage();
    }else{
        homePage();
    }

    location.hash;
}


searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends=";

});

arrowBtn.addEventListener("click", () => {
    history.back();
    //location.hash = "#home";

});



window.addEventListener("load", navigator,false);
window.addEventListener("hashchange", navigator,false);
