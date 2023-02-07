import { render } from "../../node_modules/lit-html/lit-html.js";

export function addRender(ctx, next) {
    ctx.render = renderContent
    next()
}
function renderContent(content, navigation) {
    if (navigation) {
        return render(content(), navigation)
    } else {
        return render(content(), document.getElementById('root'))
    }
}
