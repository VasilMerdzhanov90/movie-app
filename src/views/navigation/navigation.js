import { html } from "../../lib/lit/lit-html.js";

const template = () => html`
  <div class="main-navigation">
    <nav class="user-navigation">
      <ul id="user-navigation">
      </ul>
    </nav>
    <div class="logo">
      <img src="../../../acets/logo.jpg" alt="logo" />
    </div>
    <ul class="links">
      <li class="link"><a class="link-href" href="/movies">Movies</a></li>
      <li class="link"><a class="link-href" href="/series">TV shows</a></li>
      <li class="link"><a class="link-href" href="/search">Search</a></li>
    </ul>
  </div>
`;

export function navigationComponent(ctx, next) {
  ctx.render(() => template(), document.getElementById("navigation"));
  next();

  const links = document.querySelectorAll(".link-href");

  links.forEach((element) => {
    element.addEventListener("click", (e) => {
      links.forEach((el) => {
        el.classList.remove("active");
      });
      element.classList.add("active");
    });
  });
}
