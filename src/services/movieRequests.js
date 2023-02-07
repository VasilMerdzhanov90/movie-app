import { movieRequestLinks, seriesRequestLinks } from "./tmdb/linksAndAPI.js";

const baseURL = 'https://api.themoviedb.org/3';
const trailerURL = 'https://api.themoviedb.org/3/movie/';

const imageUrl = 'http://image.tmdb.org/t/p/w300';
const baseVideoURL = 'https://www.youtube.com/embed/';

export const API_KEY = 'ca699f41df4cdcc6f6807864d5581587';
export const urlMovieSearch = 'https://api.themoviedb.org/3/movie/';
export const urlYouTube = 'https://www.youtube.com/embed/';


let error = null;
let isPending = false;

async function request(fullURL) {
    isPending = true;
    error = null;

    try {
        const response = await fetch(fullURL);
        if (response.ok) {
            isPending = false;
            return response.json()
        } else {
            isPending = false;
            throw new Error(response)
        }
    } catch (err) {
        isPending = false;
        throw new error(err.message)
    }

}

export function requestData() {
    let url = '';

    const searchMovie = async (query) => {
        url = baseURL + movieRequestLinks.movieSearch(query);
        return await request(url)
    };


    const loadMovies = async (category) => {
        url = baseURL + movieRequestLinks[category];
        return await request(url);
    };

    const searchShow = async (id) => {
        url = baseURL + seriesRequestLinks.seriesSearch(id);
        return await request(url);
    };

    const loadShows = async (category) => {
        url = baseURL + seriesRequestLinks[category];
        return await request(url);
    };

    const videoDataLoader = async (movieId) => {
        url = trailerURL + movieId + movieRequestLinks.videoSearch;
        return await request(url);
    }

    return { loadMovies, searchMovie, loadShows, searchShow, videoDataLoader }

}