import { html } from "../../../node_modules/lit-html/lit-html.js";
import {
  productionCompaniesGenerator,
  spanGenerator,
} from "../../utils/utils.js";

const template = (data) => html`
  <div class="details-container">
    <section class="top-content">
      <div class="img-wrapper">
        <img
          src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
            ? data.result.backdrop_path
            : data.result.poster_path}"
          alt="poster"
        />
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
    <section class="media"></section>
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
          <img
            src="http://image.tmdb.org/t/p/w200${actor.profile_path}"
            alt="poster"
          />
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
// {
//   "adult": false,
//   "backdrop_path": "/kc4Tuc0aONtPOqOs0PAPQGmJren.jpg",
//   "belongs_to_collection": null,
//   "budget": 3000000,
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     }
//   ],
//   "homepage": "https://a24films.com/films/the-whale",
//   "id": 785084,
//   "imdb_id": "tt13833688",
//   "original_language": "en",
//   "original_title": "The Whale",
//   "overview": "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption.",
//   "popularity": 624.61,
//   "poster_path": "/k2ez0xoCc2uDkRPqktGhW1qZzuP.jpg",
//   "production_companies": [
//     {
//       "id": 7503,
//       "logo_path": "/3K8wbNkTn7O4wX89ucnp1ZYR1XF.png",
//       "name": "Protozoa Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 41077,
//       "logo_path": "/1ZXsGaFPgrgS6ZZGS37AqD5uU12.png",
//       "name": "A24",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2022-12-09",
//   "revenue": 11096765,
//   "runtime": 117,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "",
//   "title": "The Whale",
//   "video": false,
//   "vote_average": 7.383,
//   "vote_count": 103
// } details.js:4:11
