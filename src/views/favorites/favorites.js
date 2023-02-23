import { html } from "../../../node_modules/lit-html/lit-html.js";
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
                    src="http://image.tmdb.org/t/p/w300${x.photoUrl}"
                  />
                  <p class="fav-title">
                    ${x.name}
                  </p>
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
  console.log(Object.values(favorites));
  ctx.render(() => template(Object.values(favorites)));
}
