import { html } from "../../../node_modules/lit-html/lit-html.js";
import {
  productionCompaniesGenerator,
  spanGenerator,
} from "../../utils/utils.js";

const template = (data) => html`
  <div class="details-container">
    <section class="top-content">
      <div class="img-wrapper">
        <img class="poster" src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
      ? data.result.backdrop_path
      : data.result.poster_path}" alt="poster" />
      </div>
      <div class="info-wrapper">
        <section class="title">
          <h2>${data.result.title}</h2>
        </section>
        <section class="quick-info">
          <span>${data.result.release_date}</span>
          <span> - ${spanGenerator(data.result.genres)}</span>
          <span>- ${data.result.runtime} minutes</span>
          <span> - <a href="${data.result.homepage}">Homepage.</a></span>
        </section>
        <section class="overview">
          <h3>Overview:</h3>
          <p>${data.result.overview}</p>
        </section>
        <section class="crew">
          <p>Director: ${data.credits.crew.director}</p>
          <p>Producers: ${data.credits.crew.producers.join(", ")}</p>
          <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
        </section>
        <section class="prod-companies">
          ${productionCompaniesGenerator(data.result.production_companies)}
        </section>
      </div>
    </section>
    <section class="media">
      <h3>Videos</h3>
      <div @click="${videoHandler}" class="media-container">
        <section class="player">
          <iframe width="300" height="150" src="https://www.youtube.com/embed/qNVwRHQL8jw" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </section>
        <section class="playlist">
          <ul>
            ${data.videoList.results.map(x => html`
            <li data-key="${x.key}">
              ${x.name}
            </li>`)}
          </ul>
        </section>
      </div>
    </section>
    <section @click="${slider}" class="cast">
      <h3>Full cast:</h3>
      <i class="fa-sharp fa-solid fa-arrow-left left"></i>
      <i class="fa-sharp fa-solid fa-arrow-right right"></i>
      <div class="slider">${data.credits.cast.map(templateRow)}</div>
    </section>
  </div>
`;

const templateRow = (actor) => html`
  ${actor.profile_path
  ? html`<div class="actor-container">
    <div class="img-wrapper">
      <img src="http://image.tmdb.org/t/p/w200${actor.profile_path}" alt="poster" />
    </div>
    <p class="name">${actor.name}</p>
    <span>as ${actor.character}</span>
  </div>`
  : ""}
`;

export function detailsView(ctx) {
  console.log(ctx.data);
  ctx.render(() => template(ctx.data, slider));
}

function slider(e) {
  const slide = document.querySelector(".slider");
  if (e.target.tagName === "I") {
    if (e.target.classList.contains("left")) {
      slide.scrollLeft -= 205;
    } else {
      slide.scrollLeft += 205;
    }
  }
}
function videoHandler(e) {
  const baseVideoURL = 'https://www.youtube.com/embed/';
  const iFrame = document.querySelector('iframe');
  if (e.target.tagName === 'LI') {
    const key = e.target.dataset.key
    iFrame.src = baseVideoURL+key
  } else {
    return
  }
}