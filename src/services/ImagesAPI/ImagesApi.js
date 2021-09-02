import axios from "axios";
const BASIC_URL = "https://pixabay.com/api/";
const KEY = "23098776-3f405a43ba996034d96fd1d68";
const PERPAGE = 12;

const imageApiService = (imageName, page = 1) => {
  return axios
    .get(
      `${BASIC_URL}?key=${KEY}&q=${imageName}&image_type=photo&per_page=${PERPAGE}&page=${page}`
    )
    .then((response) => response.data.hits)
    .catch((error) => console.log(error));
};

export default imageApiService;
