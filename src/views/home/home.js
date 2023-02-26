import { html } from "../../lib/lit/lit-html.js";
const template = (data) => html`
  <div class="home">
    <!-- <p>Watch trailers and add titles to you personal favorite list!</p> -->
    <div class="home-sign">
      <h2>Join Today</h2>
      <div class="grid-container">
        <p>
          Get access to maintain your own custom personal list, search for
          movies, tv shows and artists, regardless if it's in theatres, on TV or
          available on popular streaming services like Netflix, Amazon Prime
          Video, Apple TV Plus, MUBI, and Curiosity Stream..
        </p>
        <ul>
          <li>Enjoy ad free</li>
          <li>Maintain a personal watchlist</li>
          <li>Simple UI</li>
          <li>Site is using TMDB database</li>
        </ul>
      </div>
      <a href="/register"><button>Sign Up</button></a>
    </div>

    <div class="container-slider">
      <section class="home-movies">
        <h2>Explore movies</h2>
        <div class="auto-slider">
          ${data.moviePosters.map(
            (x) => html` <img src="https://image.tmdb.org/t/p/w154${x}" /> `
          )}
        </div>
      </section>
      <section class="home-series">
        <h2>Explore series</h2>
        <div class="auto-slider">
          ${data.seriesPosters.map(
            (x) => html` <img src="https://image.tmdb.org/t/p/w154${x}" /> `
          )}
        </div>
      </section>
    </div>
  </div>
`;

export async function homeView(ctx) {
  ctx.render(() => template(ctx.data));

  const [movies, series] = document.querySelectorAll(".auto-slider");
}
