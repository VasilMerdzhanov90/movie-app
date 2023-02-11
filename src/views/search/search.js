import { html } from "../../../node_modules/lit-html/lit-html.js";
import { requestData } from "../../services/requestDataTMDB.js";

const { searchMovie, searchSeries } = requestData();

let loadedResults = {
  results: [],
  total_pages: null,
};

let currentPage = 1;
let context;

let totalResults = {
  searchedString: null,
  total: null,
};
const template = (onSearchInputHandler) => html`
  <div class="search-container">
    <form @submit="${onSearchInputHandler}">
      <input type="search" name="query" placeholder="type here to search" />
      <select id="select" name="type" class="select-type-search">
        <option value="movies" label="movies"></option>
        <option value="series" label="series"></option>
      </select>
      <input type="submit" value="search" />
    </form>
    <div class="search-results"></div>
  </div>
`;

const templateCorrectInput = () => html` <div class="no-content">
  <h2>Search input must be at least 3 characters!</h2>
</div>`;

const resultTemplate = (data, type, string) => html`
  <div class="category-container">
    <p class="search-summary">
      ${totalResults.total} results found for: "${totalResults.searchedString}"
    </p>
    <ul>
      ${data.map(
        (x) => html` <li>
          <a href="/details/${x.id}">
            <img
              src="http://image.tmdb.org/t/p/w300${!x.poster_path
                ? x.backdrop_path
                : x.poster_path}"
              alt="poster"
            />
            <p class="movie-title">${x.name ? x.name : x.title}</p>
          </a>
        </li>`
      )}
    </ul>
    ${loadedResults.total_pages !== 1 && loadedResults.total_pages > currentPage
      ? html`<button
          class="load-btn"
          @click=${() => handleSearch(string, type, true)}
        >
          Load more
        </button>`
      : ""}
  </div>
`;

export function searchView(ctx) {
  context = ctx;
  ctx.render(() => template(onSearchHandler));

  async function onSearchHandler(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const searchString = formData.query;
    const searchType = formData.type;
    if (searchString.length < 3) {
      ctx.render(
        templateCorrectInput,
        document.querySelector(".search-results")
      );
      return;
    } else {
      handleSearch(searchString, searchType, false);
    }
    e.target.reset();
  }
}

async function handleSearch(string, type, pushPages) {
  let result =
    type === "movies"
      ? await searchMovie(string, currentPage)
      : await searchSeries(string, currentPage);
  result.results = result.results.filter(
    (x) => x.backdrop_path !== null || x.poster_path !== null
  );
  currentPage++;

  for (let element of result.results) {
    loadedResults.results.push(element);
  }

  loadedResults.total_pages = JSON.parse(JSON.stringify(result.total_pages));
  if (pushPages) {
    context.render(
      () => resultTemplate(loadedResults.results, type, string),
      document.querySelector(".search-results")
    );
    console.log(loadedResults);
  } else {
    console.log(loadedResults);
    totalResults.total = result.total_results;
    totalResults.searchedString = string;
    currentPage = 1;
    context.render(
      () => resultTemplate(result.results, type, string),
      document.querySelector(".search-results")
    );
  }
}
