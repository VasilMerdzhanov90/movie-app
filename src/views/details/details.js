import { html } from "../../../node_modules/lit-html/lit-html.js";
import { useCollection } from "../../services/firebaseDB/data.js";
import { getUser, setFavorites } from "../../utils/userData.js";
import {
  listGenerator,
  productionCompaniesGenerator,
  slider,
  videoSlider,
} from "../../utils/utils.js";

const template = (data, favorites, handleFavoritesChoice) => html`
  <div class="details-container">
    <section class="top-content">
      <div id="image-wrapper" class="img-wrapper">
        <img
          class="poster"
          src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
            ? data.result.backdrop_path
            : data.result.poster_path}"
          alt="poster"
        />
        ${favorites?.hasOwnProperty(data.result.id)
          ? html`<button @click="${() => handleFavoritesChoice("remove")}">
              remove from favorites
            </button>`
          : html`<button @click="${() => handleFavoritesChoice("add")}">
              add to favorites
            </button>`}
      </div>
      <div class="info-wrapper">
        <section class="title">
          <h2>${data.result.title || data.result.name}</h2>
        </section>
        ${data.result.last_air_date
          ? html`<span>last air date ${data.result.last_air_date}</span>
          <span> - ${listGenerator(data.result.genres)}</span>
          ${
            data.result.runtime
              ? html`<span>- ${data.result.runtime} minutes</span>`
              : ""
          }
          <span> - <a href="${data.result.homepage}">Homepage.</a></span>
        </section>`
          : html`
              <section class="quick-info">
                <span>${data.result.release_date}</span>
                <span> - ${listGenerator(data.result.genres)}</span>
                <span>- ${data.result.runtime} minutes</span>
                <span> - <a href="${data.result.homepage}">Homepage.</a></span>
              </section>
            `}
        <section class="overview">
          <h3>Overview:</h3>
          <p>${data.result.overview}</p>
        </section>
        ${data.result.created_by
          ? html` <section class="crew">
              <p>Created by: ${listGenerator(data.result.created_by)}</p>
              <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
              <p>
                Seasons count: ${data.result.seasons.length},
                ${data.result.status}
              </p>
            </section>`
          : html`
              <section class="crew">
                <p>Director: ${data.credits.crew.director}</p>
                <p>Producers: ${data.credits.crew.producers.join(", ")}</p>
                <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
              </section>
            `}
        <section class="prod-companies">
          ${productionCompaniesGenerator(data.result.production_companies)}
        </section>
      </div>
    </section>

    ${data.videoList.results.length !== 0
      ? html`<section @click="${videoSlider}" class="media">
          <h2>Videos (${data.videoList.results.length})</h2>
          ${data.videoList.results.length > 1
            ? html`<i class="fa-sharp fa-solid fa-arrow-left left prev"></i>
                <i class="fa-sharp fa-solid fa-arrow-right right next"></i>`
            : ""}
          <ul class="videos">
            <div class="slide-videos">
              <ul class="video-list">
                ${data.videoList.results.map(
                  (x) => html`
                    <li>
                      <iframe
                        title="${data.result.title ||
                        data.result.name ||
                        data.result.original_title}"
                        frameborder="0"
                        width="780"
                        height="421"
                        src="http://www.youtube.com/embed/${x.key}"
                      ></iframe>
                    </li>
                  `
                )}
              </ul>
            </div>
          </ul>
        </section>`
      : ""}

    <section @click="${slider}" class="cast">
      <h3>Full cast:</h3>
      <i class="fa-sharp fa-solid fa-arrow-left left"></i>
      <i class="fa-sharp fa-solid fa-arrow-right right"></i>
      <div class="slider">
        ${data.credits.cast.map(
          (x) =>
            html`${x.profile_path &&
            html`<div class="actor-container">
              <a href="/person/${x.id}" class="img-wrapper">
                <img
                  src="http://image.tmdb.org/t/p/w200${x.profile_path}"
                  alt="poster"
                />

                <p class="name">${x.name}</p>
                <span>as ${x.character}</span>
              </a>
            </div>`}`
        )}
      </div>
    </section>
  </div>
`;

export function detailsView(ctx) {
  const { updateDocument } = useCollection("users");
  const { user, favorites } = getUser();

  ctx.render(() => template(ctx.data, favorites, handleFavoritesChoice));

  async function handleFavoritesChoice(action) {
    if (action === "add") {
      favorites[ctx.params.id] = {
        id: ctx.params.id,
        photoUrl: ctx.data.result.backdrop_path || ctx.data.result.poster_path,
        name:
          ctx.data.result.title ||
          ctx.data.result.original_title ||
          ctx.data.result.name,
        type: ctx.params.category,
        overview: ctx.data.result.overview,
      };
    } else if (action === "remove") {
      delete favorites[ctx.params.id];
    }
    await updateDocument(user.user.user.uid, favorites);
    setFavorites(favorites);
    ctx.render(() => template(ctx.data, favorites, handleFavoritesChoice));
  }
}
