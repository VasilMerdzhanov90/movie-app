import { html } from "../../node_modules/lit-html/lit-html.js";
import { userActions } from "../services/firebaseDB/users.js";
import { getUser } from "../utils/userData.js";

const { logout } = userActions();

const loggedInTemplate = () => html`
  <li class="link"><a class="link-href" href="/">HOME</a></li>
  <li><a href="/favorite">FAVORITES</a></li>
  <li><a id="logout" href="javascript:void(0)">LOGOUT</a></li>
`;

const notLoggedInTemplate = () => html`
  <li><a class="link-href" href="/">Home</a></li>
  <li><a href="/login">LOGIN</a></li>
  <li><a href="/register">REGISTER</a></li>
`;

export function userNavigation(ctx, next) {
  const user = getUser();

  if (user) {
    ctx.render(loggedInTemplate, document.getElementById("user-navigation"));
    document.getElementById("logout").addEventListener("click", async (e) => {
      await logout();
      ctx.page.redirect("/");
    });
  } else {
    ctx.render(notLoggedInTemplate, document.getElementById("user-navigation"));
  }
  next();
}
