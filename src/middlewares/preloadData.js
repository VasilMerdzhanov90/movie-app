import { requestData } from "../services/requestDataTMDB.js";

const { loadMovies, loadSeries, searchMovie, searchSeries } = requestData();

export async function preloadMovies(ctx, next) {
  let result = await loadMovies(ctx.params.category, ctx.params.page);
  result.results = result.results.filter(
    (x) => x.backdrop_path !== null || x.poster_path !== null
  );
  ctx.data = result;
  ctx.data.total_pages = result.total_pages;
  next();
}

export async function preloadSeries(ctx, next) {
  let result = await loadSeries(ctx.params.category, ctx.params.page);
  result.results = result.results.filter(
    (x) => x.backdrop_path !== null || x.poster_path !== null
  );
  ctx.data = result;
  ctx.data.total_pages = result.total_pages;
  next();
}
export async function preloadDetails(ctx, next) {
  let result = await loadShows(ctx.params.category, ctx.params.id);
  result.results = result.results.filter(
    (x) => x.backdrop_path !== null || x.poster_path !== null
  );
  ctx.data = result;
  next();
}
