import { fetchSingleImage } from './fetchImage'

[...Array(4)].map((_, i) => {
  setTimeout(() => {
    fetchSingleImage(document.querySelector('.gallery__content'))
  }, 2000 * i)
})
