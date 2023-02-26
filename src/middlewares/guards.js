import { getUser } from "../utils/userData.js";

export const userGuard = (ctx, next) => {
  const { user } = getUser();
  if (user) {
    ctx.page.redirect("/");
  }
  next();
};

export const noUserGuard = (ctx, next) => {
  const { user } = getUser();
  if (!user) {
    ctx.page.redirect("/login");
  }
  next();
};
