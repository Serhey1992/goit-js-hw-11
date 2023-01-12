import { imageApi } from "./js/fetch";



const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEL.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
    
    imageApi(searchQuery).then(gallery => createGalleryMarkup(gallery))
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
};

function createGalleryMarkup({gallery:{hits, totalHits}}) {
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
    Notify.success(`Hooray! We found ${totalHits} images.`);
    galleryEl.innerHTML = markup.join('');
}