import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const GetPhoto = (SearchWord, PageNumber) => {
  const key = `?key=${process.env.REACT_APP_APIKEY}`;
  const settings = '&image_type=photo&orientation=horizontal&per_page=12';
  const searchQwery = `&q=${SearchWord}`;
  const numberP = `&page=${PageNumber}`;
  return axios.get(key + settings + searchQwery + numberP);
};

export default GetPhoto;
