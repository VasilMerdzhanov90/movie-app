import { html } from "../../../node_modules/lit-html/lit-html.js";
import {
  productionCompaniesGenerator,
  spanGenerator,
} from "../../utils/utils.js";

const template = (data) => html`
  <div class="details-container">
    <section class="top-section">
      <h3 class="title">${data.result.title}</h3>
      <p><span>Release date:</span> ${data.result.release_date}</p>
      <p><span>Runtime:</span> ${data.result.runtime} minutes</p>
    </section>
    <section class="media-section">
      <img
        src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
          ? data.result.backdrop_path
          : data.result.poster_path}"
        alt="poster"
      />
      <div>
        <h3>TODO trailer</h3>
      </div>
    </section>
    <section class="details-section">
      <div class="genre-container">${spanGenerator(data.result.genres)}</div>
      <a href="${data.result.homepage}">Go to homepage.</a>
      <div class="overview">${data.result.overview}</div>
      <div class="prod-countries">
        ${spanGenerator(data.result.production_countries)}
      </div>
      <div class="prod-companies">
        ${productionCompaniesGenerator(data.result.production_companies)}
      </div>
    </section>
  </div>
`;

export function detailsView(ctx) {
  console.log(ctx.data);
  ctx.render(() => template(ctx.data));
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
