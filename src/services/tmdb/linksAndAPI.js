const imageUrl = 'http://image.tmdb.org/t/p/w300';
const baseVideoURL = 'https://www.youtube.com/embed/';

export const API_KEY = 'ca699f41df4cdcc6f6807864d5581587';
export const urlMovieSearch = 'https://api.themoviedb.org/3/movie/';
export const urlYouTube = 'https://www.youtube.com/embed/';

export const urlSearchByQuery = (value) => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;

export const requestLinks = {
    trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    netflixOriginal: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    documentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    movieSearch: `?api_key=${API_KEY}&language=en-US`,
    videoSearch: `/videos?api_key=${API_KEY}&language=en-US`
};

