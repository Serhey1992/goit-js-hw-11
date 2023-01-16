import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { imageApi, page, query } from './js/fetch';



const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

formEL.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onBtnClick);

const lightbox = new SimpleLightbox('.gallery a');

async function onSearch(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter something');
    return;
  };

  try {
    const searchData = await imageApi(searchQuery);
    const { hits, totalHits } = searchData;
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    createGalleryMarkup(hits);
    if (totalHits > 40) {
      loadBtn.classList.remove('js-load-btn');
      page += 1;
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}

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

  async function onBtnClick() {
  const response = await imageApi(query);
  const { hits, totalHits } = response;
    createGalleryMarkup(hits)
  lightbox.refresh();
  const amountPages = totalHits / 40 - page;
  if (amountPages < 1) {
    loadBtn.classList.add('js-load-btn');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}