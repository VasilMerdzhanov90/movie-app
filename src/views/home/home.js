import { html } from "../../../node_modules/lit-html/lit-html.js";
import { request } from "../../services/tmdb/data.js";

const template = () => html`
<section>
   <h2>Upcoming movies</h2>
   <div class="upcoming-container">
      <div class="upcoming">
         <button class="prev">prev</button>
         <button class="next">next</button>
         <ul class="movies">
            <li class="movie">
               <img src="$1" alt="poster" />
               <p class="poster-title">title</p>
            </li>
         </ul>
      </div>
   </div>

</section>
`
export function homeView(ctx) {
   ctx.render(template)
}


