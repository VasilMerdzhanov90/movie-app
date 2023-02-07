const baseURL = 'https://api.themoviedb.org/3';
const trailerURL = 'https://api.themoviedb.org/3/movie/';

import { movieRequestLinks } from "./linksAndAPI.js";


export function request() {
    let isPending = false;
    let errorResolving = null;

    const getNowPlaying = async () => {
        const response = await fetch(baseURL + movieRequestLinks.upcoming);
        return response.json();
    }

    const getByCategory = async (category) => {
        return movieRequestLinks[category]
    }

    const getAllCategories = async () => {
        isPending = true;
        errorResolving = null;
        try {
            const [upcoming, popular, trending, topRated, actionMovies, comedyMovies, horrorMovies] = await Promise.all([
                fetch(baseURL + movieRequestLinks.upcoming),
                fetch(baseURL + movieRequestLinks.popular),
                fetch(baseURL + movieRequestLinks.trending),
                fetch(baseURL + movieRequestLinks.topRated),
                fetch(baseURL + movieRequestLinks.actionMovies),
                fetch(baseURL + movieRequestLinks.comedyMovies),
                fetch(baseURL + movieRequestLinks.horrorMovies),
            ]);
            isPending = false;
            return Promise.all([
                { upcoming: await upcoming.json() },
                { popular: await popular.json() },
                { trending: await trending.json() },
                { topRated: await topRated.json() },
                { action: await actionMovies.json() },
                { comedy: await comedyMovies.json() },
                { horror: await horrorMovies.json() },
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
            const response = await fetch(trailerURL + movieId + movieRequestLinks.videoSearch);
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


    return { isPending, errorResolving, getAllGenre: getAllCategories, searchByKeyWord, videoDataLoader, getNowPlaying, getByCategory }
}