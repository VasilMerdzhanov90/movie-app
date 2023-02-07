import { html } from "../../../node_modules/lit-html/lit-html.js";
import { requestData } from "../../services/movieRequests.js";

const mainTemplate = (data) => html`
   ${data.map(row => html`
   <div class="category-container" id="${Object.keys(row)[0]}">
      <h2>${Object.keys(row)[0]}</h2>
      <div class="slider">
         <i class="fa-sharp fa-solid fa-arrow-left left"></i>
         <i class="fa-sharp fa-solid fa-arrow-right right"></i>
         ${Object.values(row)[0].results.map(templateRow)
      }
      </div>
   </div>
   <button class="btn">see all pages</button>
   `)}

`

const templateRow = (movie) => html`
   <div class="movie-container">
      <a href="/${movie.id}">
         <img src="http://image.tmdb.org/t/p/w300${!movie.poster_path ? movie.backdrop_path : movie.poster_path}"
            alt="poster">
         <p class="movie-title">${movie.name ? movie.name : movie.title}</p>
      </a>
   </div>
`;

export async function moviesView(ctx) {
   const { loadMovies } = requestData();

   const result = await Promise.all([
      { upcoming: await loadMovies('upcoming') },
      { playing: await loadMovies('nowPlaying') },
      { popular: await loadMovies('popular') },
      { trending: await loadMovies('trending') },
      { top: await loadMovies('topRated') }
   ]);
   ctx.render(() => mainTemplate(result));

   const categoryContainer = document.querySelectorAll('div .category-container');
   categoryContainer.forEach(element => {
      const sliderElements = element.children[1];
      sliderElements.querySelectorAll('.left').forEach(btn => {
         btn.addEventListener('click', (e) => {
            const imageWidth = categoryContainer[0].querySelector('img').clientWidth
            sliderElements.scrollLeft -= imageWidth + 5
         })
      })
      sliderElements.querySelectorAll('.right').forEach(btn => {
         btn.addEventListener('click', (e) => {
            const imageWidth = categoryContainer[0].querySelector('img').clientWidth
            sliderElements.scrollLeft += imageWidth + 5
         })
      })

   })
}

