import { html } from "../../../node_modules/lit-html/lit-html.js";


const template = (onSearchHandler) => html`
<div class="search-container">
    <input @search="${onSearchHandler}" type="search" name="query" placeholder="type here to search">
    <div class="search-results">

    </div>
</div>
`

export function searchView(ctx) {
    ctx.render(() => template(onSearchHandler))


    function onSearchHandler(e) {
        e.preventDefault()
        console.log(e.target)
        const url = new URL(window.location);
        url.searchParams.set('query', e.target.value);
        window.history.pushState({}, '', url)
    }
}