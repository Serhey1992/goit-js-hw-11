import { imageApi } from "./js/fetch";



const formEL = document.querySelector('#search-form');
formEL.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
    imageApi(searchQuery);
}