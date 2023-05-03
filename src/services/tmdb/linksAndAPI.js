// export const imageUrl = "https://image.tmdb.org/t/p/w300";
const baseVideoURL = "https://www.youtube.com/embed/";
const API_KEY = "ca699f41df4cdcc6f6807864d5581587";

// export const urlMovieSearch = "https://api.themoviedb.org/3/movie/";
// export const urlYouTube = "https://www.youtube.com/embed/";
export const movieRequestLinks = {
  // upcoming: (page) =>
  //   `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
  upcoming: (page) => `main/movies/upcoming/${page}`,
  // playing: (page) =>
  //   `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`,
  // trending: (page) =>
  //   `/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`,
  // action: (page) =>
  //   `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`,
  // comedy: (page) =>
  //   `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`,
  // horror: (page) =>
  //   `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`,
  // romance: (page) =>
  //   `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${page}`,

  playing: (page) => `main/movies/playing/${page}`,
  trending: (page) => `main/movies/trending/${page}`,
  action: (page) => `main/movies/action/${page}`,
  comedy: (page) => `main/movies/comedy/${page}`,
  horror: (page) => `main/movies/horror/${page}`,
  romance: (page) => `main/movies/romance/${page}`,

  movieSearch: (query, page = 1) =>
    `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
  videoSearch: (id) => `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
  movieSearchById: (id) => `/movie/${id}?api_key=${API_KEY}&language=en-US`,
  movieCredits: (id) =>
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
};

export const seriesRequestLinks = {
  // rated: (page) =>
  //   `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
  // netflix: (page) =>
  //   `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${page}`,
  // aired: (page) =>
  //   `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`,
  // popular: (page) =>
  //   `/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  // todays: (page) =>
  //   `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`,

  rated: (page) => `main/series/rated/${page}`,
  netflix: (page) => `main/series/netflix/${page}`,
  aired: (page) => `main/series/aired/${page}`,
  popular: (page) => `main/series/popular/${page}`,
  todays: (page) => `main/series/todays/${page}`,

  seriesSearch: (query, page = 1) =>
    `/search/tv?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`, // ??????????
  seriesSearchById: (id) => `/tv/${id}?api_key=${API_KEY}&language=en-US`,
  videoSearch: (id) => `/tv/${id}/videos?api_key=${API_KEY}&language=en-US`,
  seriesCredits: (id) =>
    `/tv/${id}/aggregate_credits?api_key=${API_KEY}&language=en-US`,
};

export const personRequestLinks = {
  personDetails: (id) => `/person/${id}?api_key=${API_KEY}&language=en-US`,
  personCombinedCredits: (id) =>
    `/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`,
  searchPerson: (query, page = 1) =>
    `/search/person?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
};
