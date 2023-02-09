import { requestData } from "../services/movieRequests.js";

const { loadMovies } = requestData();

export async function preloadData(ctx, next) {
    let result = await loadMovies(ctx.params.category, ctx.params.page);
    result.results = result.results.filter(x => x.backdrop_path !== null || x.poster_path !== null)
    ctx.data = result;
    console.log(ctx.data)
    ctx.data.total_pages = result.total_pages
    console.log(result.total_pages)
    next()
}