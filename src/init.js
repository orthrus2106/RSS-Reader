import * as yup from 'yup'
import i18nextInstance from 'i18next'
import createWatchedState from './renders/view'
import resources from './locales/index'
import loadRss from './loadRss'
import updateRss from './updateRss'
import renderStaticText from './renders/renderStaticText'
import * as bootstrap from 'bootstrap'

export default async () => {
  const state = {
    uiState: {
      error: null,
      status: '', // valid, invalid, sending
      language: 'en',
      openedPostId: 0,
      watchedPosts: [],
    },
    updateTime: 5000, // every 5 seconds
    urls: [],
    feeds: [
    //   { id: 0, title: 'title', description: 'description' },
    ],
    posts: [
    // {
    // id: 0,
    // feedId: feed-1,
    // title: title,
    // link: link,
    // description: 'description'
    // },
    ],
  }

  const i18n = i18nextInstance.createInstance()

  await i18n.init({
    lng: state.uiState.language,
    debug: false,
    resources,
  })

  yup.setLocale({
    string: {
      url: i18n.t('errors.invalidUrl'),
    },
    mixed: {
      notOneOf: i18n.t('errors.alreadyExists'),
    },
  })

  const watchedState = createWatchedState(state, i18n)

  const schema = yup.string()
    .required(
      'required',
    )
    .url(
      'invalidUrl',
    )
    .test(
      'is-invalid',
      'alreadyExists',
      value => !state.urls.includes(value.trim()),
    )
  document.addEventListener('DOMContentLoaded', () => {
    renderStaticText(i18n)
  })

  const form = document.querySelector('.rss-form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const inputData = formData.get('input').trim()
    schema.validate(inputData)
      .then(() => {
        watchedState.uiState.status = 'sending'

        return loadRss(inputData, watchedState)
          .then(({ feed, posts }) => {
            watchedState.feeds.push(feed)
            watchedState.posts.push(...posts)
            watchedState.urls.push(inputData.trim())
            watchedState.uiState.status = 'valid'
            watchedState.uiState.error = null
          })
      })
      .catch((err) => {
        watchedState.uiState.error = err.message
        watchedState.uiState.status = 'invalid'
      })
  })

  const intervalForm = document.querySelector('#intervalForm')
  const modalElement = document.querySelector('#updateIntervalModal')

  intervalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(intervalForm)
    const inputData = formData.get('input').trim()
    if (inputData <= 1000) return
    watchedState.updateTime = Number(inputData)
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    if (modalInstance) {
      modalInstance.hide()
    }
  })

  const switchLanguage = document.querySelector('#switchLanguage')

  switchLanguage.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return
    const selectedLang = e.target.dataset.lang
    if (selectedLang === 'ru' || selectedLang === 'en') {
      i18n.changeLanguage(selectedLang).then(() => {
        watchedState.uiState.language = selectedLang
        renderStaticText(i18n)
      }).catch((err) => {
        console.error('Error changing language:', err)
      })
    }
  })

  const postsElement = document.querySelector('#posts')

  postsElement.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.tagName !== 'BUTTON') return
    const clickedPostId = e.target.dataset.id
    watchedState.uiState.openedPostId = clickedPostId
    watchedState.uiState.watchedPosts.push(clickedPostId)
  })

  setTimeout((updateRss(watchedState)), state.updateTime)
}
