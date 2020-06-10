import './app'
import '../styles/styles.css'
import { fetchSingleImage } from './modules/fetchImage.js'

fetchSingleImage(document.querySelector('.about__content'))
