import Notiflix from "notiflix";
import { getImgApi } from "./js/fetchImg";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let last_page = 0;
let query = '';

formEl.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadBtnClick);

const lightbox = new SimpleLightbox('.gallery a');

async function onFormSubmit(evt) {
    evt.preventDefault();
    query = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    galleryEl.innerHTML = '';
    loadBtn.hidden = true;
    if (!query) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }

    try {
        const searchData = await getImgApi(query, page);
        const { hits, totalHits } = searchData;
        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return  
        }

        createGalleryMarkup(hits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        if (totalHits > 40) {
            loadBtn.hidden = false;
        }
        lightbox.refresh();
    } catch (error) {
        Notiflix.Notify.failure('Something went wrong! Please retry');
        console.log(error);
    }
};
function createGalleryMarkup(arr) {
    const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-img" />
    </a>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>${likes}
            </p>
            <p class="info-item">
            <b>Views</b>${views}
            </p>
            <p class="info-item">
            <b>Comments</b>${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>${downloads}
            </p>
        </div>
    </div>`);
    galleryEl.innerHTML = markup.join('');
};
  
async function onLoadBtnClick() {
    page += 1;
    const response = await getImgApi(query, page);
    const { hits, totalHits } = response;
    createGalleryMarkup(hits);
    last_page = totalHits / 40 - page;
    lightbox.refresh();
  if (last_page < 1) {
      loadBtn.hidden = true;
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}