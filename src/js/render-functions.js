const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more')

export const clearGalley = () => {
  gallery.innerHTML = '';
}

export const renderLoading = () => {
  gallery.innerHTML = '<span class="loader"></span>';
};

export const removeLoading = () => {
  gallery.querySelector('.loader')?.remove()
}

export const showLoadMore = () => {
  loadMoreButton.classList.remove('hidden')
}

export const hideLoadMore = () => {
  loadMoreButton.classList.add('hidden')
}

const createImageCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = largeImageURL;

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const img = document.createElement('img');
  img.classList.add('image-preview');
  img.src = webformatURL;
  img.alt = tags;

  imageContainer.appendChild(img);
  a.appendChild(imageContainer);

  const cardDescription = document.createElement('div');
  cardDescription.classList.add('card-description');

  const attributes = [
    { label: 'Likes', value: likes },
    { label: 'Views', value: views },
    { label: 'Comments', value: comments },
    { label: 'Downloads', value: downloads },
  ];

  attributes.forEach(attr => {
    const span = document.createElement('span');
    span.classList.add('attribute');
    span.innerHTML = `<span>${attr.label}</span> ${attr.value}`;
    cardDescription.appendChild(span);
  });

  a.appendChild(cardDescription);
  li.appendChild(a);

  return li;
};

export const renderImages = images => {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    fragment.appendChild(createImageCard(image));
  });

  let ul = gallery.querySelector('.gallery-list');
  if (!ul) {
    ul = document.createElement('ul');
    ul.classList.add('gallery-list');
    gallery.appendChild(ul);
  }

  ul.appendChild(fragment);
};

export const renderError = (message = 'An error occurred while loading images.') => {
  gallery.innerHTML = `<span class="error">${message}</span>`;
};