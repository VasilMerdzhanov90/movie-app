import { getUser } from "../utils/userData.js";

export const userGuard = (ctx, next) => {
  if (getUser()) {
    ctx.page.redirect("/");
}
next()
};

export const noUserGuard = (ctx, next) => {
  if (!getUser()) {
    ctx.page.redirect("/login");
  }
  next()
};
