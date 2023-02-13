import { html } from "../../../node_modules/lit-html/lit-html.js";
import {
  productionCompaniesGenerator,
  spanGenerator,
} from "../../utils/utils.js";

const template = (data, category) => html`
  <div class="details-container">
    <section class="top-section">
      <h3 class="title">${category == 'movies'? data.result.title : data.result.name}</h3>
      <p><span>Release date:</span> ${category == 'movies'? data.result.release_date : data.result.first_air_date}</p>
      <p><span>Runtime:</span> ${category == 'movies'?data.result.runtime:data.result.episode_run_time} minutes</p>
    </section>
    <section class="media-section">
      <img src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
      ? data.result.backdrop_path
      : data.result.poster_path}" alt="poster" />
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
      <div class="crew">
        ${data.credits.crew.director !== null ? html`<p><span>Director:</span> ${data.credits.crew.director}</p>` : ''}
        ${data.credits.crew.producers.length!==0 
          ? html`<p><span>Producers:</span> ${data.credits.crew.producers.join(', ')}</p>`
           : ''}
        ${data.credits.crew.writers.length!==0 
          ? html`<p><span>Writers:</span> ${data.credits.crew.writers.join(', ')}</p>`
           : ''}
      </div>
    </section>
    <section class="cast">
    <h3 class="title">Actor staff:</h3>
${category == 'movies' ? data.credits.cast.map(templateRowMovies): data.credits.cast.map(templateRowSeries)}
    </section>
  </div>
`;

const templateRowMovies = (actor) =>html`
   <div class="actor-container">
    <div class="img-wrapper">
      <img src="http://image.tmdb.org/t/p/w200${actor.profile_path}"
      alt="poster">
    </div>
         <p class="actor-name">${actor.name}</p>
         <p class="role">as ${actor.character}</p>
        </div>
   `
  
  const templateRowSeries = (actor) =>html`
  <div class="actor-container">
   <div class="img-wrapper">
     <img src="http://image.tmdb.org/t/p/w200${actor.profile_path}"
     alt="poster">
   </div>
        <p class="actor-name">${actor.name}</p>
        <p class="role">as ${actor.roles[0].character}</p>
        <p class="episodes-count">Played ${actor.roles[0].episode_count} episodes</p>
  </div>
  `
export function detailsView(ctx) {
  console.log(ctx);
  ctx.render(() => template(ctx.data,ctx.params.category));
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
