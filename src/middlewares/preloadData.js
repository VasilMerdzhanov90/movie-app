import { requestData } from "../services/tmdb/requestDataTMDB.js";

const {
  loadMainContent,
  searchById,
  getCredits,
  getVideoList,
  getPersonDetails,
  getPersonCredits,
} = requestData();

export async function preloadMovies(ctx, next) {
  console.log(ctx);
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
  const category = ctx.path.split("/")[2];
  const id = ctx.params.id;
  ctx.data = {};
  const crew = {
    director: null,
    producers: [],
    writers: [],
  };
  let result = await searchById(id, category);
  let credits = await getCredits(id, category);

  ctx.data.result = result;
  ctx.data.credits = credits;

  credits.crew.map((element) => {
    if (element.job == "Director") {
      return (crew.director = element.name);
    } else if (element.job == "Producer") {
      return crew.producers.push(element.name);
    } else if (element.department == "Writing") {
      return crew.writers.push(element.name);
    }
  });

  ctx.data.credits.crew = crew;
  next();
}
export async function preloadVideos(ctx, next) {
  const category = ctx.path.split("/")[2];
  const id = ctx.params.id;
  let videoList = await getVideoList(id, category);

  ctx.data.videoList = videoList;
  next();
}

export async function preloadPersonDetails(ctx, next) {
  const id = ctx.params.id;
  let [details, credits] = await Promise.all([
    await getPersonDetails(id),
    await getPersonCredits(id),
  ]);
  credits.cast.map((x) =>
    x.release_date !== undefined
      ? (x.release_date = x.release_date.split("-")[0])
      : null
  );
  credits.cast = credits.cast.sort((a, b) =>
    a.release_date !== undefined && b.release_date !== undefined
      ? b.release_date.localeCompare(a.release_date)
      : ""
  );
  ctx.person = { details, credits };
  next();
}

export async function preloadHomeData(ctx, next) {
  ctx.data = {};
  const result = await Promise.all([
    { movies: await loadMainContent("movies", "playing", 1) },
    { series: await loadMainContent("series", "popular", 1) },
  ]);
  ctx.data.moviePosters = result[0].movies.results.map(
    (x) => x.poster_path || x.backdrop_path
  );
  ctx.data.seriesPosters = result[1].series.results.map(
    (x) => x.poster_path || x.backdrop_path
  );
  ctx.data.moviePosters.length = 6;
  ctx.data.seriesPosters.length = 6;
  next();
}
