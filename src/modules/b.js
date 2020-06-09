const galleryElement = document.querySelector('.gallery__content')

function fetchSingleImage () {
  const getRandomUnsplashImage = new XMLHttpRequest()

  getRandomUnsplashImage.onreadystatechange = function() {
    if (getRandomUnsplashImage.readyState == 4 && getRandomUnsplashImage.status == 200) {
      const createdImage = document.createElement('img')

      createdImage.setAttribute('src', getRandomUnsplashImage.responseURL)
      galleryElement.appendChild(createdImage)
    }
  }

  getRandomUnsplashImage.open('GET', 'https://source.unsplash.com/random', true)
  getRandomUnsplashImage.send(null)
}

[...Array(4)].map((_, i) => {
  setTimeout(() => {
    fetchSingleImage()
  }, 2000 * i)
})
