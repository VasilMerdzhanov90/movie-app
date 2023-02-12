import { html } from "../../../node_modules/lit-html/lit-html.js";
import { requestData } from "../../services/requestDataTMDB.js";

const { searchMovie, searchSeries } = requestData();

let context;
let currentPage = 1;
let currentSearch = "";
let totalPages = null;
let totalResults = null;
let currentType = null;

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

const resultTemplate = (data) => html`
  <div class="category-container">
    <p class="search-summary">
      ${totalResults} results found for: "${currentSearch}"
    </p>
    <ul>
      ${data.results.map(
        (x) => html` <li>
          <a href="/details/${currentType}/${x.id}">
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
    <div class="btn-pagination-container">
      ${currentPage > 1
        ? html`<i
            class=" fa-sharp fa-solid fa-arrow-left left"
            @click="${() => handleSearch(currentSearch, currentType, "prev")}"
          ></i>`
        : ""}
      <span>page ${currentPage} of ${totalPages}</span>
      ${currentPage < totalPages
        ? html`<i
            class="fa-sharp fa-solid fa-arrow-right right"
            @click="${() => handleSearch(currentSearch, currentType, "next")}"
          ></i>`
        : ""}
    </div>
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
      handleSearch(searchString, searchType);
    }
    e.target.reset();
  }
}

async function handleSearch(string, type, page) {
  if (page === "next") {
    currentPage++;
  } else if (page === "prev") {
    currentPage--;
  } else {
    currentPage = 1;
    currentSearch = string;
    currentType = type;
  }
  let result =
    type === "movies"
      ? await searchMovie(string, currentPage)
      : await searchSeries(string, currentPage);
  result.results = result.results.filter(
    (x) => x.backdrop_path !== null || x.poster_path !== null
  );

  totalPages = result.total_pages;
  totalResults = result.total_results;
  currentSearch = string;
  currentType = type;
  context.render(() => resultTemplate(result));
}
