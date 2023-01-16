import { imageApi } from "./js/fetch";
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let per_page = 40;
let pages = 1;

let inputText = '';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

formEL.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onBtnClick);

async function onSearch(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value
  .trim()
  .toLowerCase();
  
  if (!searchQuery) {
    loadBtn.classList.add('hidden');
  };

  if (inputText !== searchQuery) {
    inputText = searchQuery;
    cleanGalleryMarkup();
  };

  if (inputText || pages >= page) {
    await onBtnClick();
    simpleLightBox.refresh();
  }
    
};

function cleanGalleryMarkup() {
  galleryEl.innerHTML = '';
  loadBtn.classList.add('hidden');
  page = 1;
}

async function getInformation() {
  try {
    const gallery = await imageApi(inputText, page, per_page);
    pages = Math.ceil(gallery.data.total / per_page);
    const searchMassege = gallery.data;
    console.log(gallery.data);
    statusMsg(searchMassege, page, pages);
    return searchMassege.hits;
  } catch (error) {
    console.log(error0);
  }
}


function createGalleryMarkup(gallery) {
    const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    galleryEl.innerHTML = markup.join('');
};

function statusMsg(searchMassege, page, pages){ 
  if (page === 1 && searchMassege.hits.length) {
    Notiflix.Notify.success(`Hooray! We found ${searchMassege.totalHits} images.`);
  };

  if (!searchMassege.total) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  };

  if (page === pages) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
  };
}
async function onBtnClick() {
  const gallery = await getInformation();
  loadBtn.classList.add('hidden');
  createGalleryMarkup(gallery);
  simpleLightBox.refresh();

  if (pages > page) {
    loadBtn.classList.remove('hidden');
    page += 1;
  }
 }
  

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
