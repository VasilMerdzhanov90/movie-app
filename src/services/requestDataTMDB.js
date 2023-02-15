import { isPendingHandler } from "../utils/utils.js";
import {
  movieRequestLinks,
  personRequestLinks,
  seriesRequestLinks,
} from "./tmdb/linksAndAPI.js";

const baseURL = "https://api.themoviedb.org/3";
const trailerURL = "https://api.themoviedb.org/3/movie/";

// const baseVideoURL = "https://www.youtube.com/embed/";

//  const API_KEY = "ca699f41df4cdcc6f6807864d5581587";
//  const urlMovieSearch = "https://api.themoviedb.org/3/movie/";
//  const urlYouTube = "https://www.youtube.com/embed/";

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

  const loadMovies = async (category, page) => {
    url = baseURL + movieRequestLinks[category](page);
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
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.movieSearchById(id)
        : seriesRequestLinks.seriesSearchById(id);
    url = baseURL + urlStructure;
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

  const getPersonDetails = async (id) => {
    const url = baseURL + personRequestLinks.personDetails(id);
    return await request(url);
  };

  const getPersonCredits = async (id) => {
    const url = baseURL + personRequestLinks.personCombinedCredits(id);
    return await request(url);
  };

  const searchByKeyWord = async (query, page, type) => {
    if (type === "movies") {
      return await request(
        baseURL + movieRequestLinks.movieSearch(query, page)
      );
    } else if (type === "series") {
      return await request(
        baseURL + seriesRequestLinks.seriesSearch(query, page)
      );
    }
  };

  // const searchSeries = async (query, page) => {
  //   url = baseURL + seriesRequestLinks.seriesSearch(query, page);
  //   return await request(url);
  // };
  // const searchMovie = async (query, page) => {
  //   url = baseURL + movieRequestLinks.movieSearch(query, page);
  //   return await request(url);
  // };

  return {
    loadMovies,
    loadSeries,
    videoDataLoader,
    searchById,
    getCredits,
    getVideoList,
    getPersonDetails,
    getPersonCredits,
    searchByKeyWord,
  };
}
