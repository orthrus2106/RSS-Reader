export default (state, value, i18n) => {
  const feedBack = document.querySelector('#feedback')
  const input = document.querySelector('#url-input')

  if (!value) {
    if (state.uiState.status === 'valid') return
    input.classList.remove('is-invalid')
    feedBack.textContent = ''
    return
  }

  input.classList.add('is-invalid')
  feedBack.classList.remove('text-success')
  feedBack.classList.add('text-danger')

  switch (value) {
    case 'required':
      feedBack.textContent = i18n.t('errors.required')
      break
    case ('invalidUrl'):
      feedBack.textContent = i18n.t('errors.invalidUrl')
      break
    case ('alreadyExists'):
      feedBack.textContent = i18n.t('errors.alreadyExists')
      break
    case ('networkError'):
      feedBack.textContent = i18n.t('errors.networkError')
      break
    case ('invalidRss'):
      feedBack.textContent = i18n.t('errors.invalidRss')
      break
    default:
      throw new Error('## unknown error')
  }
  input.focus()
}
