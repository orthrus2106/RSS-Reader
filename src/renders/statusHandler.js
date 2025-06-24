export default (path, value, i18n) => {
  const feedBack = document.querySelector('#feedback');
  const button = document.querySelector('#add-button');
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  if (value === 'sending') {
    button.setAttribute('disabled', '');
  } else if (value === 'valid') {
    button.removeAttribute('disabled');
    feedBack.textContent = i18n.t('successed.rssLoaded');
    feedBack.classList.remove('text-danger');
    feedBack.classList.add('text-success');
    form.reset();
    input.focus();
  } else if (value === 'invalid') {
    button.removeAttribute('disabled');
    input.focus();
  }
};
