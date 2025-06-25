export default (value, i18n) => {
  const feedBack = document.querySelector('#feedback')
  const button = document.querySelector('#add-button')
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const spinner = document.querySelector('#spinner');

  if (value === 'sending') {
    spinner.classList.remove('d-none');
    button.append(spinner);
    button.setAttribute('disabled', '')
  }

  else if (value === 'valid') {
    button.removeAttribute('disabled')
    feedBack.textContent = i18n.t('successed.rssLoaded')
    feedBack.classList.remove('text-danger')
    feedBack.classList.add('text-success')
    spinner.classList.add('d-none');
    form.reset()
    input.focus()
  }
  else if (value === 'invalid') {
    button.removeAttribute('disabled')
    spinner.classList.add('d-none');
    input.focus()
  }
}
