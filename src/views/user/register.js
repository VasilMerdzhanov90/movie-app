import { html } from "../../../node_modules/lit-html/lit-html.js";
import { userActions } from "../../services/firebaseDB/users.js";
import { OnSubmitHandler } from "../../utils/userData.js";

const { signIn } = userActions();

const registerTemplate = (onSubmit) => html`
  <div class="sign-user">
    <h1>REGISTER</h1>
    <form @submit="${onSubmit}">
      <label>
        <span>username:</span>
        <input type="text" name="username" />
      </label>
      <label>
        <span>email:</span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>password:</span>
        <input type="password" name="password" required />
      </label>
      <label>
        <span>repeat password:</span>
        <input type="password" name="rePass" required />
      </label>
      <div id="error"></div>

      <input class="btn-user" type="submit" value="REGISTER" />
    </form>
    <p>REGISTERED YET? <a href="/login">LOGIN HERE</a></p>
  </div>
`;

export function registerView(ctx) {
  ctx.render(() => registerTemplate(OnSubmitHandler(ctx, onSubmit)));
}
async function onSubmit(ctx, data) {
  const displayName = data.username.trim();
  const email = data.email.trim();
  const password = data.password.trim();
  const rePass = data.rePass.trim();
  const emptyInput = displayName == "" || email == "" || password == "";

  if (emptyInput) {
    ctx.render(
      () => html`<p>All fields must be filled!</p>`,
      document.getElementById("error")
    );
    return;
  } else if (password !== rePass) {
    ctx.render(
      () => html`<p>Passwords don't match!</p>`,
      document.getElementById("error")
    );
    return;
  } else {
    const submitBtn = document.getElementsByClassName("btn-user")[0];
    submitBtn.disabled = true;
    const newUser = await signIn({ email, password, displayName });
    if (typeof newUser == "string") {
      ctx.render(
        () => html`<p>Email already in use!</p>`,
        document.getElementById("error")
      );
      submitBtn.disabled = false;
    } else {
      ctx.page.redirect("/movies");
    }
  }
}
