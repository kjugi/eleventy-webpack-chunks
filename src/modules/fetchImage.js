import axios from 'axios'

export async function fetchSingleImage (element) {
  try {
    const { request } = await axios.get('https://source.unsplash.com/random')

    const createdImage = document.createElement('img')

    createdImage.setAttribute('src', request.responseURL)
    element.appendChild(createdImage)
  } catch (error) {
    console.error(error)
  }
}
