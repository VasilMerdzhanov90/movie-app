import { isPendingHandler } from "../utils/utils.js";
import { movieRequestLinks, seriesRequestLinks } from "./tmdb/linksAndAPI.js";

const baseURL = "https://api.themoviedb.org/3";
const trailerURL = "https://api.themoviedb.org/3/movie/";

const imageUrl = "http://image.tmdb.org/t/p/w300";
const baseVideoURL = "https://www.youtube.com/embed/";

export const API_KEY = "ca699f41df4cdcc6f6807864d5581587";
export const urlMovieSearch = "https://api.themoviedb.org/3/movie/";
export const urlYouTube = "https://www.youtube.com/embed/";

async function request(fullURL) {
  isPendingHandler(true);
  try {
    const response = await fetch(fullURL);
    if (response.ok) {
      isPendingHandler(false);
      return response.json();
    } else {
      isPendingHandler(false);
      throw new Error(response);
    }
  } catch (err) {
    isPendingHandler(false);
    throw new Error(err);
  }
}

export function requestData() {
  let url = "";

  const searchMovie = async (query, page) => {
    url = baseURL + movieRequestLinks.movieSearch(query, page);
    return await request(url);
  };

  const loadMovies = async (category, page) => {
    url = baseURL + movieRequestLinks[category](page);
    return await request(url);
  };

  const searchSeries = async (query, page) => {
    url = baseURL + seriesRequestLinks.seriesSearch(query, page);
    return await request(url);
  };

  const loadSeries = async (category, page) => {
    url = baseURL + seriesRequestLinks[category](page);
    return await request(url);
  };

  const videoDataLoader = async (movieId) => {
    url = trailerURL + movieId + movieRequestLinks.videoSearch;
    return await request(url);
  };

  const searchById = async (id, category) => {
    console.log(category);
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.movieSearchById(id)
        : seriesRequestLinks.seriesSearchById(id);
    url = baseURL + urlStructure;
    console.log(url);
    return await request(url);
  };
  const getCredits = async (id, category) => {
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.movieCredits(id)
        : seriesRequestLinks.seriesCredits(id);
    url = baseURL + urlStructure;

    return await request(url);
  };
  const getVideoList = async (id, category) => {
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.videoSearch(id)
        : seriesRequestLinks.videoSearch(id);
    url = baseURL + urlStructure;
    return await request(url);
  };

  return {
    loadMovies,
    searchMovie,
    loadSeries,
    searchSeries,
    videoDataLoader,
    searchById,
    getCredits,
    getVideoList,
  };
}
