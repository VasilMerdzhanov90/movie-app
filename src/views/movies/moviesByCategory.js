import { html } from "../../../node_modules/lit-html/lit-html.js";
import { arrayGenerator, categoryListGenerator } from "../../utils/utils.js";


let currentPage = 1;

const template = (data, category, pages, redirectToPage) => html`
<div class="category-container">
    <ul class="categories-list">
        ${categoryListGenerator()}
    </ul>
    <h3>${category}</h3>
    <ul>
        ${data.results.map(
    (x) => html`
        <li>
            <a href="/details/${x.id}">
                <img src="http://image.tmdb.org/t/p/w300${!x.poster_path
            ? x.backdrop_path
            : x.poster_path}" alt="poster" />
                <p class="movie-title">${x.name ? x.name : x.title}</p>
            </a>
        </li>
        `
  )}
    </ul>
    <div class="btn-pagination-container">
        <a href="/movies/${category}/${(currentPage -=
        1 == 0 ? (currentPage = 1) : (currentPage -= 1))}"><button>prev</button></a>
        <select @change=${(e)=> redirectToPage(e, category)}>
            ${pages}
        </select>
        <a href="/movies/${category}/${(currentPage += 2)}"><button>next</button></a>
    </div>
</div>
`;

const emptyTemplate = () => html`
<div class="no-content">
    <h2>NO CONTENT ON THIS PAGE</h2>
</div>
`;

const selectOptionsGenerator = (pages) => {
    const arr = arrayGenerator(pages)

    return html`
    ${arr.map((x) => html` <option value="${x}" label="${x}">${x}</option> `)}
  `;
};

export function movieByCategoryView(ctx) {
    const pages = selectOptionsGenerator(ctx.data.total_pages);
    if (ctx.params.page <= ctx.data.total_pages) {
        ctx.render(() =>
            template(ctx.data, ctx.params.category, pages, redirectToPage)
        );
        window.scroll(0, 0);
    } else {
        ctx.render(emptyTemplate);
    }

    function redirectToPage(e, category) {
        ctx.page.redirect(`/movies/${category}/${e.target.value}`);
    }
}
