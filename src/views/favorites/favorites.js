import { html } from "../../lib/lit/lit-html.js";
import { getUser } from "../../utils/userData.js";

const template = (favorite) => html`
  <div class="fav-titles">
    <h1>FAVORITE TITLES</h1>
    ${favorite.length > 0
      ? html`<ul class="favorites">
          ${favorite.map(
            (x) => html`
              <li class="fav-list">
                <a class="fav-href" href="/details/${x.type}/${x.id}">
                  <img
                    class="fav-img"
                    src="https://image.tmdb.org/t/p/w300${x.photoUrl}"
                  />
                  <div class="fav-text-container">
                    <p class="fav-title">${x.name}</p>
                    <p class="fav-overview">${x.overview}</p>
                  </div>
                </a>
              </li>
            `
          )}
        </ul>`
      : html`<h2>THERE ARE NO SELECTED TITLES YET!</h2>`}
  </div>
`;

export function favoritesView(ctx) {
  const { user, favorites } = getUser();
  ctx.render(() => template(Object.values(favorites)));
}
