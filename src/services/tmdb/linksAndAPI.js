export const imageUrl = 'http://image.tmdb.org/t/p/w300';
const baseVideoURL = 'https://www.youtube.com/embed/';

export const API_KEY = 'ca699f41df4cdcc6f6807864d5581587';
export const urlMovieSearch = 'https://api.themoviedb.org/3/movie/';
export const urlYouTube = 'https://www.youtube.com/embed/';


export const movieRequestLinks = {
    upcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,// <<<<<<<<<<<<<<<<<<<<<<<< MAIN PAGE!
    nowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`, // <<<<<<<<<<<<<<<<<<<<<<<< MAIN PAGE!
    popular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    // netflixOriginal: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    // romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    // documentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    movieSearch: (query) => `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    videoSearch: `/videos?api_key=${API_KEY}&language=en-US`,
};

export const seriesRequestLinks = {
    topRated: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    latest: `/tv/latest?api_key=${API_KEY}&language=en-US`,
    onTheAir: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
    popular: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    airingToday: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    seriesSearch: (id) => `/tv/${id}/keywords?api_key=${API_KEY}` // ??????????
};

