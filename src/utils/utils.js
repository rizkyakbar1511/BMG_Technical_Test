import { API_KEYS_V3 } from "../keys";
export const Today = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return (today = mm + "/" + dd + "/" + yyyy);
};

export const fetchSearch = async (search) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEYS_V3}&language=en-US&query=${search}&page=1&include_adult=false`
  );
  return res.json();
};

export const fetchPopular = async (filterBy, pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${filterBy}/popular?api_key=${API_KEYS_V3}&language=en-US&page=${pages}&include_adult=false`
  );
  return res.json();
};

export const fetchPopularTv = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};

export const fetchUpcoming = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};

export const fetchDetailTv = async (tvId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEYS_V3}&language=en-US`
  );
  return res.json();
};

export const fetchVideos = async (tvId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${API_KEYS_V3}&language=en-US`
  );
  return res.json();
};

export const fetchMovieVideos = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEYS_V3}&language=en-US`
  );
  return res.json();
};

export const fetchDetailPeople = async (personId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEYS_V3}&language=en-US`
  );
  return res.json();
};

export const fetchDetailMovie = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEYS_V3}&language=en-US`
  );
  return res.json();
};

export const fetchNowPlaying = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};

export const fetchTopRated = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};

export const fetchTopRatedTv = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};

export const fetchAiring = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );

  return res.json();
};

export const fetchOnTv = async (pages) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
  );
  return res.json();
};
