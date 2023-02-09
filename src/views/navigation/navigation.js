import { html } from "../../../node_modules/lit-html/lit-html.js";


const template = (user) => html`
<nav class="main-navigation">
    <div class="logo">
        <img src="../../../public/acets/logo.jpg" alt="logo" />
        <!-- <h1 class="title">MOVIE PLACE</h1> -->
    </div>
    <ul class="links">
        <li class="link"><a class="link-href" href="/">Home</a></li>
        <li class="link"><a class="link-href" href="/movies">Movies</a></li>
        <li class="link"><a class="link-href" href="/shows">Shows</a></li>
        <li class="link"><a class="link-href" href="/search">Search</a></li>
        <!-- ${!user ? html`<li class="link"><a class="link-href" href="/login">Login/Register</a></li>` :
            html`<button>Logout</button>`
        } -->

    </ul>
</nav>
`;

export function navigationComponent(ctx, next) {
    const user = false;
    ctx.render(()=>template(user), document.getElementById('navigation'));
    next()

  const links =  document.querySelectorAll('.link-href');

    links.forEach(element=>{
        element.addEventListener('click',(e)=>{
        links.forEach(el=>{
            el.classList.remove('active')
        })
        element.classList.add('active')
    })
})
};

