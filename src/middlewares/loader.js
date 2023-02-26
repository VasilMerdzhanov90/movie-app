import { isPendingHandler } from "../utils/utils.js";

export function loader(ctx, next) {
  ctx.render(isPendingHandler(true));
  next();
}
