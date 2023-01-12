import { imageApi } from "./js/fetch";
import Notiflix from "notiflix";
import { page } from "./js/fetch";
import simpleLightbox from "simplelightbox";

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

formEL.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onBtnClick);

function onSearch(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';

  const searchQuery = evt.currentTarget.elements.searchQuery.value
  .trim()
  .toLowerCase();
  
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter something');
    return
  }
    
  imageApi(searchQuery).then(gallery => {
    const { hits, totalHits } = gallery;
    createGalleryMarkup(hits, totalHits);
    loadBtn.hidden = false;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
};

function createGalleryMarkup(hits, totalHits) {
    const markup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads}</b>
            </p>
        </div>
    </div>`);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    galleryEl.innerHTML = markup.join('');
};

function onBtnClick() {
  page += 1;
  loadBtn.hidden = true;

  imageApi(page).then(gallery => {
    const { hits, totalHits } = gallery;
    console.log(gallery);
    createGalleryMarkup(hits, totalHits);
    loadBtn.hidden = false;
    // if (hits === totalHits) {
    //   loadBtn.hidden = true;
    // }
    })
}