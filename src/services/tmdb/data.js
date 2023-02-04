const baseURL = 'https://api.themoviedb.org/3';
const trailerURL = 'https://api.themoviedb.org/3/movie/';

import { requestLinks, urlSearchByQuery } from "./linksAndAPI.js";


export function request() {
    let isPending = false;
    let errorResolving = null;

    const getAllGenre = async () => {
        isPending = true;
        errorResolving = null;
        try {
            const [netflixOriginal, topRated, trending, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaryMovies] = await Promise.all([
                fetch(baseURL + requestLinks.netflixOriginal),
                fetch(baseURL + requestLinks.topRated),
                fetch(baseURL + requestLinks.trending),
                fetch(baseURL + requestLinks.actionMovies),
                fetch(baseURL + requestLinks.comedyMovies),
                fetch(baseURL + requestLinks.horrorMovies),
                fetch(baseURL + requestLinks.romanceMovies),
                fetch(baseURL + requestLinks.documentaryMovies),
            ]);
            isPending = false;
            return Promise.all([
                { netflix: await netflixOriginal.json() },
                { topRated: await topRated.json() },
                { trending: await trending.json() },
                { action: await actionMovies.json() },
                { comedy: await comedyMovies.json() },
                { horror: await horrorMovies.json() },
                { romance: await romanceMovies.json() },
                { documentary: await documentaryMovies.json() },
            ]);

        } catch (error) {
            errorResolving = error.message;
            throw new error
        }
    };

    const searchByKeyWord = async (keyword) => {
        isPending = true;
        const searchURL = urlSearchByQuery(keyword);
        try {
            const response = await fetch(searchURL);
            if (response.ok) {
                isPending = false;
                return response.json()
            } else {
                isPending = false;
                throw new Error('Can not resolve')
            }
        } catch (error) {
            isPending = false;
            errorResolving = error.message;
            throw new error
        }
    };

    const videoDataLoader = async (movieId) => {
        isPending = true;
        try {
            const response = await fetch(trailerURL + movieId + requestLinks.videoSearch);
            if (response.ok) {
                isPending = false;
                return response.json()
            } else {
                isPending = false;
                throw new Error('Can not load video')
            }
        } catch (error) {
            errorResolving = error.message;
            throw new error
        }
    }


    return { isPending, errorResolving, getAllGenre, searchByKeyWord, videoDataLoader }
}