import { requestData } from "../services/requestDataTMDB.js";

const { loadMovies, loadSeries, searchById } = requestData();

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
  const category = ctx.params.category;
  const id = ctx.params.id;

  let result = await searchById(id, category);
  ctx.data = result;
  next();
}
