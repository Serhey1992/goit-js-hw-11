// https://pixabay.com/api/?key=32740167-9e99cf2539bcbb0df868cbe2b
// &q = cat & image_type=photo & orientation=horizontal & safesearch=true & page=1 & per_page=40
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const key = '32740167-9e99cf2539bcbb0df868cbe2b';
const parameters = '&image_type=photo&orientation=horizontal&safesearch=true&';

export async function imageApi(searchQuery, page, per_page) {
  return await axios.get(`${BASE_URL}?key=${key}&q=${searchQuery}${parameters}&page=${page}&per_page=${per_page}`)
   
};
