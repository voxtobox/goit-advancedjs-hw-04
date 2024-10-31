import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import {
  renderLoading,
  renderImages,
  renderError,
  removeLoading,
  showLoadMore
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { hideLoadMore } from './js/render-functions';

const simpleGallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captions: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'attr',
  captionsData: 'alt',
});

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let page = 1;
let perPage = 15;
let searchParam = '';
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const form = event.target;
  searchParam = form.elements.search.value.trim();
  if (!searchParam) {
    return;
  }

  form.reset();

  renderLoading();

  page = 1;

  try {
    hideLoadMore();
    const images = await fetchImages(searchParam, perPage, page);

    removeLoading();
    if (images.total > 15) {
      showLoadMore();
    }
    totalHits = images.totalHits;
    if (images.total === 0) {
      throw new Error('Sorry, there are no images matching your search query. Please try again!');
    }
    renderImages(images.hits);
    simpleGallery.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
    renderError();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    const images = await fetchImages(searchParam, perPage, page);
    renderImages(images.hits);
    simpleGallery.refresh();

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage >= totalHits) {
      hideLoadMore();
      iziToast.info({
        title: 'Info',
        message: "You've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
    renderError();
  }
});