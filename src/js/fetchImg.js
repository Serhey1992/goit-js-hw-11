import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32740167-9e99cf2539bcbb0df868cbe2b';
    const options = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export async function getImgApi(searchQuery, page) {

  try {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&${options}&page=${page}`);
    const inform = response.data;
    return inform;
  } catch (error) {
    console.error(response.statusText);
    }
}