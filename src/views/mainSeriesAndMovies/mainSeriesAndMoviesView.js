import { html } from "../../lib/lit/lit-html.js";
import { requestData } from "../../services/tmdb/requestDataTMDB.js";
import { getUser } from "../../utils/userData.js";
import { categoryListGenerator, sliderPreview } from "../../utils/utils.js";
const { loadMovies, loadSeries } = requestData();

let fav;

const mainTemplate = (data, type) => html`
  <div class="movies-container">
    <ul class="categories-list">
      ${categoryListGenerator(type)}
    </ul>
    ${data.map(
      (row) => html`
        <div class="category-container" id="${Object.keys(row)[0]}">
          <h2>${Object.keys(row)[0]}</h2>
          <div class="slider">
            <i class="fa-sharp fa-solid fa-arrow-left left"></i>
            <i class="fa-sharp fa-solid fa-arrow-right right"></i>
            ${Object.values(row)[0].results.map((x) => templateRow(x, type))}
          </div>
        </div>
      `
    )}
  </div>
`;

const templateRow = (videoTitle, type) => html`
  <div id="image-wrapper" class="movie-container">
    <a href="/details/${type}/${videoTitle.id}">
      <img
        id="image"
        src="http://image.tmdb.org/t/p/w300${videoTitle.poster_path ||
        videoTitle.backdrop_path}"
        alt="poster"
      />
      ${fav?.hasOwnProperty(videoTitle.id)
        ? html`<img id="selected" src="../../../acets/selected.png" />`
        : ""}
      <p class="movie-title">${videoTitle.name || videoTitle.title}</p>
    </a>
  </div>
`;

export async function mainSeriesAndMoviesView(ctx) {
  const type = ctx.pathname.split("/")[1];
  console.log(ctx);
  const { favorites } = getUser();
  fav = favorites;
  if (type === "movies") {
    const result = await Promise.all([
      { upcoming: await loadMovies("upcoming", 1) },
      { playing: await loadMovies("playing", 1) },
      { trending: await loadMovies("trending", 1) },
      { action: await loadMovies("action", 1) },
      { comedy: await loadMovies("comedy", 1) },
      { horror: await loadMovies("horror", 1) },
      { horror: await loadMovies("trending", 1) },
    ]);
    ctx.render(() => mainTemplate(result, type));
  } else if (type === "series") {
    const result = await Promise.all([
      { rated: await loadSeries("rated", 1) },
      { netflix: await loadSeries("netflix", 1) },
      { aired: await loadSeries("aired", 1) },
      { popular: await loadSeries("popular", 1) },
      { todays: await loadSeries("todays", 1) },
    ]);
    ctx.render(() => mainTemplate(result, type));
  }

  sliderPreview(document.querySelectorAll("div .category-container"));
}
