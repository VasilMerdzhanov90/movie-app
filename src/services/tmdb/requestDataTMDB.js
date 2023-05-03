import { getUser } from "../../utils/userData.js";
import { isPendingHandler } from "../../utils/utils.js";
import {
  movieRequestLinks,
  personRequestLinks,
  seriesRequestLinks,
} from "./linksAndAPI.js";

const tmdbURL = "https://tmdb-service.onrender.com/";
const baseServiceUrl = "https://tmdb-service.onrender.com/";
const localhostUrl = "http://localhost:3030/";
const baseURL = "https://api.themoviedb.org/3";
const trailerURL = "https://api.themoviedb.org/3/movie/";

// async function request(fullURL) {
//   isPendingHandler(true);
//   try {
//     const response = await fetch(fullURL);
//     if (response.ok) {
//       // const newResponse = await fetch(
//       //   `http://localhost:3030/main/movies/upcoming/1`,
//       //   {
//       //     method: "GET",
//       //     headers: {
//       //       uid: uid,
//       //     },
//       //   }
//       // );
//       isPendingHandler(false);
//       return response.json();
//     } else {
//       isPendingHandler(false);
//       throw new Error(response);
//     }
//   } catch (err) {
//     isPendingHandler(false);
//     throw new Error(err);
//   }
// }

async function request(fullURL) {
  const currentUser = getUser();
  const uid = currentUser?.user?.user.user.uid;

  isPendingHandler(true);
  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        uid: uid,
      },
    });

    if (response.ok) {
      isPendingHandler(false);
      return await response.json();
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

  // const loadMovies = async (category, page) => {
  //   url = baseURL + movieRequestLinks[category](page);
  //   return await request(url);
  // };

  // const loadSeries = async (category, page) => {
  //   url = baseURL + seriesRequestLinks[category](page);
  //   return await request(url);
  // };

  const loadMainContent = async (type, category, page) => {
    url =
      type === "movies"
        ? localhostUrl + movieRequestLinks[category](page)
        : localhostUrl + seriesRequestLinks[category](page);

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
    } else if (type === "person") {
      return await request(
        baseURL + personRequestLinks.searchPerson(query, page)
      );
    }
  };

  return {
    // loadMovies,
    // loadSeries,
    loadMainContent,

    videoDataLoader,
    searchById,
    getCredits,
    getVideoList,
    getPersonDetails,
    getPersonCredits,
    searchByKeyWord,
  };
}
