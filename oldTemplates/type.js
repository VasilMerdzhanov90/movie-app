// import { html } from "../../../node_modules/lit-html/lit-html.js";
// import { requestData } from "../../services/tmdb/requestDataTMDB.js";
// import { getUser } from "../../utils/userData.js";
// import { categoryListGenerator, sliderPreview } from "../../utils/utils.js";

// let fav;

// const mainTemplate = (data) => html`
//   <div class="movies-container">
//     <ul class="categories-list">
//       ${categoryListGenerator("movies")}
//     </ul>
//     ${data.map(
//       (row) => html`
//         <div class="category-container" id="${Object.keys(row)[0]}">
//           <h2>${Object.keys(row)[0]}</h2>
//           <div class="slider">
//             <i class="fa-sharp fa-solid fa-arrow-left left"></i>
//             <i class="fa-sharp fa-solid fa-arrow-right right"></i>
//             ${Object.values(row)[0].results.map(templateRow)}
//           </div>
//         </div>
//       `
//     )}
//   </div>
// `;

// const templateRow = (movie) => html`
//   <div id="image-wrapper" class="movie-container">
//     <a href="/details/movies/${movie.id}">
//       <img
//         id="image"
//         src="http://image.tmdb.org/t/p/w300${!movie.poster_path
//           ? movie.backdrop_path
//           : movie.poster_path}"
//         alt="poster"
//       />
//       ${fav?.hasOwnProperty(movie.id)
//         ? html`<img id="selected" src="../../../public/acets/selected.png" />`
//         : ""}
//       <p class="movie-title">${ movie.name || movie.title}</p>
//     </a>
//   </div>
// `;

// export async function moviesView(ctx) {
//   const { loadMovies } = requestData();

//   const { favorites } = getUser();
//   fav = favorites;
//   const result = await Promise.all([
//     { upcoming: await loadMovies("upcoming", 1) },
//     { playing: await loadMovies("playing", 1) },
//     { trending: await loadMovies("trending", 1) },
//     { action: await loadMovies("action", 1) },
//     { comedy: await loadMovies("comedy", 1) },
//     { horror: await loadMovies("horror", 1) },
//     { horror: await loadMovies("trending", 1) },
//   ]);
//   ctx.render(() => mainTemplate(result));

//   sliderPreview(document.querySelectorAll("div .category-container"));
// }