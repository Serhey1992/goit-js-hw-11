// https://pixabay.com/api/?key=32740167-9e99cf2539bcbb0df868cbe2b
// &q = cat & image_type=photo & orientation=horizontal & safesearch=true & page=1 & per_page=40
import axios from "axios";
import Notiflix from 'notiflix';
export let page = 1;
export let query = null;

const BASE_URL = 'https://pixabay.com/api/';
const key = '32740167-9e99cf2539bcbb0df868cbe2b';
const parameters = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export async function imageApi(searchQuery) {
  if (searchQuery !== query) {
    page = 1;
    query = searchQuery;
  }
  try {
    const responce = await axios.get(`${BASE_URL}?key=${key}&q=${query}${parameters}&page=${page}`);
    page += 1;
    console.log(responce.data)
    return responce.data;
  } catch(error) {
    Notiflix.Notify.failure('Something went wrong');
    console.log(error);
  } 
};
