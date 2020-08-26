import { action } from "easy-peasy";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = {
  modalStyle: getModalStyle(),
};

const popperModel = {
  tv: null,
  movie: null,
  triggerMovie: action((state, payload) => {
    state.movie = payload;
  }),
  triggerTv: action((state, payload) => {
    state.tv = payload;
  }),
};

const searchModel = {
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
};

const popoverModel = {
  popover: null,
  setPopover: action((state, payload) => {
    state.popover = payload;
  }),
};

const personModel = {
  personId: "",
  setPersonId: action((state, payload) => {
    state.personId = payload;
  }),
};

const movieModel = {
  movieId: "",
  tvId: "",
  pages: 1,
  filterBy: "movie",
  open: false,
  setMovieId: action((state, payload) => {
    state.movieId = payload;
  }),
  setTvId: action((state, payload) => {
    state.tvId = payload;
  }),
  setPages: action((state, payload) => {
    state.pages = payload;
  }),
  setFilterBy: action((state, payload) => {
    state.filterBy = payload;
  }),
  setOpen: action((state, payload) => {
    state.open = payload;
  }),
};

const toastModel = {
  trigger: false,
  setTrigger: action((state, payload) => {
    state.trigger = payload;
  }),
};

export const storeModel = {
  popper: popperModel,
  popover: popoverModel,
  search: searchModel,
  movie: movieModel,
  person: personModel,
  toast: toastModel,
  modal: modalStyles,
};
