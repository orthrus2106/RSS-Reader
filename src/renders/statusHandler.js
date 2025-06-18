export default (path, value, i18n) => {
  const button = document.querySelector('#add-button');
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  if (value === 'sending') {
    button.setAttribute('disabled', '');
  } else if (value === 'valid') {
    button.removeAttribute('disabled');
    form.reset();
    input.focus();
  }
};
