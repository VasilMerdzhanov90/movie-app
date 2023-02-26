// import { html } from "../../node_modules/lit-html/lit-html.js";
// import { listGenerator, productionCompaniesGenerator } from "./utils.js";

// //details page
// export const movieDetailsTemplate = (data) => html`
//   <div class="details-container">
//     <section class="top-content">
//       <div class="img-wrapper">
//         <img
//           class="poster"
//           src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
//             ? data.result.backdrop_path
//             : data.result.poster_path}"
//           alt="poster"
//         />
//       </div>
//       <div class="info-wrapper">
//         <section class="title">
//           <h2>${!data.result.title}</h2>
//         </section>
//         <section class="quick-info">
//           <span>${data.result.release_date}</span>
//           <span> - ${listGenerator(data.result.genres)}</span>
//           <span>- ${data.result.runtime} minutes</span>
//           <span> - <a href="${data.result.homepage}">Homepage.</a></span>
//         </section>
//         <section class="overview">
//           <h3>Overview:</h3>
//           <p>${data.result.overview}</p>
//         </section>
//         <section class="crew">
//           <p>Director: ${data.credits.crew.director}</p>
//           <p>Producers: ${data.credits.crew.producers.join(", ")}</p>
//           <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
//         </section>

//         <section class="prod-companies">
//           ${productionCompaniesGenerator(data.result.production_companies)}
//         </section>
//       </div>
//     </section>

//     ${data.videoList.results.length !== 0
//       ? html`<section @click="${videoSlider}" class="media">
//           <h2>Videos (${data.videoList.results.length})</h2>
//           <i class="fa-sharp fa-solid fa-arrow-left left prev"></i>
//           <i class="fa-sharp fa-solid fa-arrow-right right next"></i>
//           <ul class="videos">
//             <div class="slide-videos">
//               <ul class="video-list">
//                 ${data.videoList.results.map(
//                   (x) => html`
//                     <li>
//                       <iframe
//                         frameborder="0"
//                         width="780"
//                         height="421"
//                         src="https://www.youtube.com/embed/${x.key}"
//                       ></iframe>
//                     </li>
//                   `
//                 )}
//               </ul>
//             </div>
//           </ul>
//         </section>`
//       : ""}

//     <section @click="${slider}" class="cast">
//       <h3>Full cast:</h3>
//       <i class="fa-sharp fa-solid fa-arrow-left left"></i>
//       <i class="fa-sharp fa-solid fa-arrow-right right"></i>
//       <div class="slider">
//         ${data.credits.cast.map(
//           (x) =>
//             html`${x.profile_path &&
//             html`<div class="actor-container">
//               <div class="img-wrapper">
//                 <img
//                   src="http://image.tmdb.org/t/p/w200${x.profile_path}"
//                   alt="poster"
//                 />
//               </div>
//               <p class="name">${x.name}</p>
//               <span>as ${x.character}</span>
//             </div>`}`
//         )}
//       </div>
//     </section>
//   </div>
// `;
// export const seriesDetailsTemplate = (data) => html`
//   <div class="details-container">
//     <section class="top-content">
//       <div class="img-wrapper">
//         <img
//           class="poster"
//           src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
//             ? data.result.backdrop_path
//             : data.result.poster_path}"
//           alt="poster"
//         />
//       </div>
//       <div class="info-wrapper">
//         <section class="title">
//           <h2>${data.result.name}</h2>
//         </section>
//         <section class="quick-info">
//           <span>last air date ${data.result.last_air_date}</span>
//           <span> - ${listGenerator(data.result.genres)}</span>
//           ${data.result.runtime
//             ? html`<span>- ${data.result.runtime} minutes</span>`
//             : ""}
//           <span> - <a href="${data.result.homepage}">Homepage.</a></span>
//         </section>
//         <section class="overview">
//           <h3>Overview:</h3>
//           <p>${data.result.overview}</p>
//         </section>
//         <section class="crew">
//           <p>Created by: ${listGenerator(data.result.created_by)}</p>
//           <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
//           <p>
//             Seasons count: ${data.result.seasons.length}, ${data.result.status}
//           </p>
//         </section>

//         <section class="prod-companies">
//           ${productionCompaniesGenerator(data.result.production_companies)}
//         </section>
//       </div>
//     </section>

//     ${data.videoList.results.length !== 0
//       ? html`<section @click="${videoSlider}" class="media">
//           <h2>Videos (${data.videoList.results.length})</h2>
//           <i class="fa-sharp fa-solid fa-arrow-left left prev"></i>
//           <i class="fa-sharp fa-solid fa-arrow-right right next"></i>
//           <ul class="videos">
//             <div class="slide-videos">
//               <ul class="video-list">
//                 ${data.videoList.results.map(
//                   (x) => html`
//                     <li>
//                       <iframe
//                         frameborder="0"
//                         width="780"
//                         height="421"
//                         src="https://www.youtube.com/embed/${x.key}"
//                       ></iframe>
//                     </li>
//                   `
//                 )}
//               </ul>
//             </div>
//           </ul>
//         </section>`
//       : ""}

//     <section @click="${slider}" class="cast">
//       <h3>Full cast:</h3>
//       <i class="fa-sharp fa-solid fa-arrow-left left"></i>
//       <i class="fa-sharp fa-solid fa-arrow-right right"></i>
//       <div class="slider">
//         ${data.credits.cast.map(
//           (x) =>
//             html`${x.profile_path &&
//             html`<div class="actor-container">
//               <div class="img-wrapper">
//                 <img
//                   src="http://image.tmdb.org/t/p/w200${x.profile_path}"
//                   alt="poster"
//                 />
//               </div>
//               <p class="name">${x.name}</p>
//               <span>as ${x.roles[0].character}</span>
//             </div>`}`
//         )}
//       </div>
//     </section>
//   </div>
// `;
// function slider(e) {
//     const slideActors = document.querySelector(".slider");
//     if (e.target.tagName === "I") {
//       if (e.target.classList.contains("left")) {
//         slideActors.scrollLeft -= 205;
//       } else {
//         slideActors.scrollLeft += 205;
//       }
//     }
//   }
//   function videoSlider(e) {
//     const videoList = document.querySelector(".video-list");
//     const clientWidth = videoList.children[0].clientWidth;
//     if (e.target.classList.contains("next")) {
//       videoList.scrollLeft += clientWidth;
//     } else if (e.target.classList.contains("prev")) {
//       videoList.scrollLeft -= clientWidth;
//     }
//   }

// const movieDetailsTemplate = (
//     data,
//     favorites,
//     addToFavHandler,
//     removeFromFavHandler
//   ) => html`
//     <div class="details-container">
//       <section class="top-content">
//         <div id="image-wrapper" class="img-wrapper">
//           <img
//             class="poster"
//             src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
//               ? data.result.backdrop_path
//               : data.result.poster_path}"
//             alt="poster"
//           />
//           <img id="selected" src="../../../public/acets/notSelected.png" />
//           ${favorites.hasOwnProperty(data.result.id)
//             ? html`<button @click="${removeFromFavHandler}">
//                 remove from favorites
//               </button>`
//             : html`<button @click="${addToFavHandler}">add to favorites</button>`}
//         </div>
//         <div class="info-wrapper">
//           <section class="title">
//             <h2>${data.result.title}</h2>
//           </section>
//           <section class="quick-info">
//             <span>${data.result.release_date}</span>
//             <span> - ${listGenerator(data.result.genres)}</span>
//             <span>- ${data.result.runtime} minutes</span>
//             <span> - <a href="${data.result.homepage}">Homepage.</a></span>
//           </section>
//           <section class="overview">
//             <h3>Overview:</h3>
//             <p>${data.result.overview}</p>
//           </section>
//           <section class="crew">
//             <p>Director: ${data.credits.crew.director}</p>
//             <p>Producers: ${data.credits.crew.producers.join(", ")}</p>
//             <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
//           </section>
  
//           <section class="prod-companies">
//             ${productionCompaniesGenerator(data.result.production_companies)}
//           </section>
//         </div>
//       </section>
  
//       ${data.videoList.results.length !== 0
//         ? html`<section @click="${videoSlider}" class="media">
//             <h2>Videos (${data.videoList.results.length})</h2>
//             ${data.videoList.results.length > 1
//               ? html`<i class="fa-sharp fa-solid fa-arrow-left left prev"></i>
//                   <i class="fa-sharp fa-solid fa-arrow-right right next"></i>`
//               : ""}
//             <ul class="videos">
//               <div class="slide-videos">
//                 <ul class="video-list">
//                   ${data.videoList.results.map(
//                     (x) => html`
//                       <li>
//                         <iframe
//                           frameborder="0"
//                           width="780"
//                           height="421"
//                           src="https://www.youtube.com/embed/${x.key}"
//                         ></iframe>
//                       </li>
//                     `
//                   )}
//                 </ul>
//               </div>
//             </ul>
//           </section>`
//         : ""}
  
//       <section @click="${slider}" class="cast">
//         <h3>Full cast:</h3>
//         <i class="fa-sharp fa-solid fa-arrow-left left"></i>
//         <i class="fa-sharp fa-solid fa-arrow-right right"></i>
//         <div class="slider">
//           ${data.credits.cast.map(
//             (x) =>
//               html`${x.profile_path &&
//               html`<div class="actor-container">
//                 <a href="/person/${x.id}" class="img-wrapper">
//                   <img
//                     src="http://image.tmdb.org/t/p/w200${x.profile_path}"
//                     alt="poster"
//                   />
  
//                   <p class="name">${x.name}</p>
//                   <span>as ${x.character}</span>
//                 </a>
//               </div>`}`
//           )}
//         </div>
//       </section>
//     </div>
//   `;
//   const seriesDetailsTemplate = (data) => html`
//     <div class="details-container">
//       <section class="top-content">
//         <div id="image-wrapper" class="img-wrapper">
//           <img
//             class="poster"
//             src="http://image.tmdb.org/t/p/w300${!data.result.poster_path
//               ? data.result.backdrop_path
//               : data.result.poster_path}"
//             alt="poster"
//           />
//           <img id="selected" src="../../../public/acets/notSelected.png" />
//         </div>
//         <div class="info-wrapper">
//           <section class="title">
//             <h2>${data.result.name}</h2>
//           </section>
//           <section class="quick-info">
//             <span>last air date ${data.result.last_air_date}</span>
//             <span> - ${listGenerator(data.result.genres)}</span>
//             ${data.result.runtime
//               ? html`<span>- ${data.result.runtime} minutes</span>`
//               : ""}
//             <span> - <a href="${data.result.homepage}">Homepage.</a></span>
//           </section>
//           <section class="overview">
//             <h3>Overview:</h3>
//             <p>${data.result.overview}</p>
//           </section>
//           <section class="crew">
//             <p>Created by: ${listGenerator(data.result.created_by)}</p>
//             <p>Writers: ${data.credits.crew.writers.join(", ")}</p>
//             <p>
//               Seasons count: ${data.result.seasons.length}, ${data.result.status}
//             </p>
//           </section>
  
//           <section class="prod-companies">
//             ${productionCompaniesGenerator(data.result.production_companies)}
//           </section>
//         </div>
//       </section>
  
//       ${data.videoList.results.length !== 0
//         ? html`<section @click="${videoSlider}" class="media">
//             <h2>Videos (${data.videoList.results.length})</h2>
//             ${data.videoList.results.length > 1
//               ? html`<i class="fa-sharp fa-solid fa-arrow-left left prev"></i>
//                   <i class="fa-sharp fa-solid fa-arrow-right right next"></i>`
//               : ""}
//             <ul class="videos">
//               <div class="slide-videos">
//                 <ul class="video-list">
//                   ${data.videoList.results.map(
//                     (x) => html`
//                       <li>
//                         <iframe
//                           frameborder="0"
//                           width="780"
//                           height="421"
//                           src="https://www.youtube.com/embed/${x.key}"
//                         ></iframe>
//                       </li>
//                     `
//                   )}
//                 </ul>
//               </div>
//             </ul>
//           </section>`
//         : ""}
  
//       <section @click="${slider}" class="cast">
//         <h3>Full cast:</h3>
//         <i class="fa-sharp fa-solid fa-arrow-left left"></i>
//         <i class="fa-sharp fa-solid fa-arrow-right right"></i>
//         <div class="slider">
//           ${data.credits.cast.map(
//             (x) =>
//               html`${x.profile_path &&
//               html`<div class="actor-container">
//                 <div class="img-wrapper">
//                 <a href="/person/${x.id}" class="img-wrapper">
//                     <img
//                     src="http://image.tmdb.org/t/p/w200${x.profile_path}"
//                     alt="poster"
//                     />
//                   </div>
//                   <p class="name">${x.name}</p>
//                   <span>as ${x.roles[0].character}</span>
//                 </a>
//               </div>`}`
//           )}
//         </div>
//       </section>
//     </div>
//   `;