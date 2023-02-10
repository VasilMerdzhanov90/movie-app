import page from './node_modules/page/page.mjs'
import { addRender } from './src/middlewares/addRender.js'
import { loader } from './src/middlewares/loader.js'
import { preloadData } from './src/middlewares/preloadData.js'
import { homeView } from './src/views/home/home.js'
import { moviesView } from './src/views/movies/movies.js'
import { movieByCategoryView } from './src/views/movies/moviesByCategory.js'
import { navigationComponent } from './src/views/navigation/navigation.js'
import { searchView } from './src/views/search/search.js'

//middlewares
page(addRender)
page(navigationComponent)
page(loader);
//links
page('/', homeView)
page('/movies', moviesView)
page('/movies/:category/:page', preloadData, movieByCategoryView)
page('/shows', () => console.log('shows'))
page('/search', searchView)
page('/search?query=test', homeView)
page('/login', () => console.log('login/register'))


page();

// const upcoming = document.querySelector('.upcoming');
// const prevBtn = document.querySelector('.prev');
// const nextBtn = document.querySelector('.next');

// const imgWidth = upcoming.querySelector('img');

// nextBtn.addEventListener('click', (e) => {
//     upcoming.scrollLeft += imgWidth.clientWidth
// })
// prevBtn.addEventListener('click', (e) => {
//     upcoming.scrollLeft -= imgWidth.clientWidth
// })
// const courosel = document.querySelector('.courosel');
// const firstImg = courosel.querySelectorAll('img')[0]
// const arrowIcons = document.querySelectorAll('.wrapper button');
// let firstImgWidth = firstImg.clientWidth + 14

// arrowIcons.forEach(button => {
//     button.addEventListener('click', () => {
//         courosel.scrollLeft += button.id == 'left' ? -firstImgWidth : firstImgWidth
//     })
// })




// for dragging
// courosel.addEventListener('mouseup', dragStop);
// courosel.addEventListener('mousedown', dragStart);


// let isDragStart = false, prevPageX, prevScrollLeft;

// const dragStart = (e) => {
//     isDragStart = true;
//     prevPageX = e.pageX;
//     prevScrollLeft = courosel.scrollLeft;
// }
// const dragStop = (e) => {
//     isDragStart = false;
// }
// const dragging = (e) => {
//     if (!isDragStart) {
//         return
//     }
//     e.preventDefault(e)
//     let positionDiff = e.pageX - prevPageX
//     courosel.scrollLeft = e.pageX
//     courosel.scrollLeft = prevScrollLeft - positionDiff
// }


// courosel.addEventListener('mousemove', dragging);

