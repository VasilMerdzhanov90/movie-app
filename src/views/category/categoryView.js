import { html } from "../../../node_modules/lit-html/lit-html.js";
import {
  categoryListGenerator,
  emptyTemplate,
  selectOptionsGenerator,
} from "../../utils/utils.js";

const template = (
  data,
  section,
  category,
  options,
  currentPage,
  redirectToPage
) => html`
  <div class="category-container">
    <ul class="categories-list">
      ${categoryListGenerator(section)}
    </ul>
    <h3>${category}</h3>
    <ul>
      ${data.results.map(
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
    <div class="btn-pagination-container">
      ${currentPage > 1
        ? html` <a href="/${section}/${category}/${(currentPage -= 1)}">
            <i class=" fa-sharp fa-solid fa-arrow-left left"></i>
          </a>`
        : ""}

      <select
        id="select"
        name="page"
        @change=${(e) => redirectToPage(e, category)}
      >
        ${options}
      </select>

      <a href="/${section}/${category}/${(currentPage += 2)}">
        <i class="fa-sharp fa-solid fa-arrow-right right"></i>
      </a>
    </div>
  </div>
`;

export function categoryView(ctx) {
  let currentPage = ctx.params.page;
  const section = ctx.path.split("/")[1];
  const category = ctx.path.split("/")[2];

  const options = selectOptionsGenerator(ctx.data.total_pages);

  if (ctx.params.page <= ctx.data.total_pages && ctx.params.page > 0) {
    ctx.render(() =>
      template(
        ctx.data,
        section,
        category,
        options,
        currentPage,
        redirectToPage
      )
    );
    window.scroll(0, 0);
  } else {
    ctx.render(emptyTemplate);
  }

  function redirectToPage(e, category) {
    ctx.page.redirect(`/${section}/${category}/${e.target.value}`);
  }

  document.getElementById("select").value = currentPage;
}
