import { html } from "../../../node_modules/lit-html/lit-html.js";
const template = (data) => html`
  <div class="home">
    <h1>Welcome to Movie Place</h1>
    <h2>Watch trailers and add titles to you personal favorite list!</h2>
    <div class="container-slider">
      <section>
        <h2>Explore movies</h2>
        <div class="auto-slider">
          ${data.moviePosters.map(
            (x) => html` <img src="http://image.tmdb.org/t/p/w200${x}" /> `
          )}
        </div>
      </section>
      <section>
        <h2>Explore tv shows</h2>
        <div class="auto-slider">
          ${data.seriesPosters.map(
            (x) => html` <img src="http://image.tmdb.org/t/p/w200${x}" /> `
          )}
        </div>
      </section>
    </div>
  </div>
`;

export async function homeView(ctx) {
  ctx.render(() => template(ctx.data));

  const [movies, series] = document.querySelectorAll(".auto-slider");
  setInterval(() => {
    movies.scrollLeft += 200;
    // console.log(movies.children[1].getBoundingClientRect());
    if (movies.children[1].getBoundingClientRect().x < 0) {
      movies.appendChild(movies.children[0]);
    }
  }, 3800);

  series.addEventListener("mousemove", (e) => {
    console.log("mousemove", e);
  });
}
