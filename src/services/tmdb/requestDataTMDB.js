import { getUser } from "../../utils/userData.js";
import { isPendingHandler } from "../../utils/utils.js";
import {
  detailsLinks,
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
  console.log(fullURL);
  isPendingHandler(true);

  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        uid: uid,
      },
    });
    console.log(response);
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

  const loadMainContent = async (type, category, page) => {
    url =
      type === "movies"
        ? baseServiceUrl + movieRequestLinks[category](page)
        : baseServiceUrl + seriesRequestLinks[category](page);

    return await request(url);
  };

  // const videoDataLoader = async (movieId) => {
  //   url = trailerURL + movieId + movieRequestLinks.videoSearch;
  //   return await request(url);
  // };

  const searchById = async (id, category) => {
    return await request(
      baseServiceUrl + detailsLinks.searchById(category, id)
    );
  };
  const getCredits = async (id, category) => {
    return await request(
      baseServiceUrl + detailsLinks.getCredits(category, id)
    );
  };
  const getVideoList = async (category, id) => {
    return await request(baseServiceUrl + detailsLinks.videoList(category, id));
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
    loadMainContent,
    // videoDataLoader,
    searchById,
    getCredits,
    getVideoList,
    getPersonDetails,
    getPersonCredits,
    searchByKeyWord,
  };
}
