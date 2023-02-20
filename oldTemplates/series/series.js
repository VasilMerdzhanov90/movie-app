// import { html } from "lit-html";
// import { requestData } from "../../src/services/tmdb/requestDataTMDB.js";
// import { getUser } from "../../src/utils/userData.js";
// import { categoryListGenerator, sliderPreview } from "../../src/utils/utils.js";

// let fav;

// const mainTemplate = (data) => html`
//   <div class="movies-container">
//     <ul class="categories-list">
//       ${categoryListGenerator("series")}
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

// const templateRow = (series) => html`
//   <div id="image-wrapper" class="movie-container">
//     <a href="/details/series/${series.id}">
//       <img
//         src="http://image.tmdb.org/t/p/w300${!series.poster_path
//           ? series.backdrop_path
//           : series.poster_path}"
//         alt="poster"
//       />
//       ${fav?.hasOwnProperty(series.id)
//         ? html`<img id="selected" src="../../../public/acets/selected.png" />`
//         : ""}

//       <p class="movie-title">${series.name ? series.name : series.title}</p>
//     </a>
//   </div>
// `;

// export async function seriesView(ctx) {
//   const { loadSeries } = requestData();

//   const { favorites } = getUser();
//   fav = favorites;
//   const result = await Promise.all([
//     { rated: await loadSeries("rated", 1) },
//     { netflix: await loadSeries("netflix", 1) },
//     { aired: await loadSeries("aired", 1) },
//     { popular: await loadSeries("popular", 1) },
//     { todays: await loadSeries("todays", 1) },
//   ]);
//   ctx.render(() => mainTemplate(result));
//   sliderPreview(document.querySelectorAll("div .category-container"));
// }
