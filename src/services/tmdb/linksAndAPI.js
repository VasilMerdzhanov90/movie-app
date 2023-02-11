export const imageUrl = "http://image.tmdb.org/t/p/w300";
const baseVideoURL = "https://www.youtube.com/embed/";

export const API_KEY = "ca699f41df4cdcc6f6807864d5581587";
export const urlMovieSearch = "https://api.themoviedb.org/3/movie/";
export const urlYouTube = "https://www.youtube.com/embed/";

export const movieRequestLinks = {
  upcoming: (page) =>
    `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`, // <<<<<<<<<<<<<<<<<<<<<<<< MAIN PAGE!
  playing: (page) =>
    `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`, // <<<<<<<<<<<<<<<<<<<<<<<< MAIN PAGE!
  // popular: (page) => `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  trending: (page) =>
    `/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`,
  netflix: (page) =>
    `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${page}`,
  // top:(page) =>  `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: (page) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`,
  comedy: (page) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`,
  horror: (page) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`,
  romance: (page) =>
    `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${page}`,
  // documentary: (page) => `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${page}`,
  movieSearch: (query, page = 1) =>
    `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
  videoSearch: `/videos?api_key=${API_KEY}&language=en-US`,
};

export const seriesRequestLinks = {
  rated: (page) =>
    `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
  // latest: (page) => `/tv/latest?api_key=${API_KEY}&language=en-US&page=${page}`,
  aired: (page) =>
    `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`,
  popular: (page) =>
    `/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  todays: (page) =>
    `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`,
  seriesSearch: (query, page = 1) =>
    `/search/tv?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`, // ??????????
};
