
// 

export function imageApi(searchResult) {
    const BASE_URL = 'https://pixabay.com/api/';
    const key = '32740167 - 9e99cf2539bcbb0df868cbe2b';
    return fetch(`${BASE_URL}?key =${key}& q=${searchResult} & image_type=photo & orientation=horizontal & safesearch=true & page=1 & per_page=40`)
        .then(response => {
        console.log(response);
    })
};
