// https://pixabay.com/api/?key=32740167-9e99cf2539bcbb0df868cbe2b
// &q = cat & image_type=photo & orientation=horizontal & safesearch=true & page=1 & per_page=40
import axios from "axios";
import Notiflix from "notiflix";
export let page = 1;


const BASE_URL = 'https://pixabay.com/api/';
const key = '32740167-9e99cf2539bcbb0df868cbe2b';
const parameters = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export function imageApi(searchQuery) {
  return fetch(`${BASE_URL}?key=${key}&q=${searchQuery}${parameters}&page=${page}`)
    .then(response => {
      if (!response.ok) {
      throw new Error(console.log("Fail!"))
      };

      return response.json();
  })
   
};
