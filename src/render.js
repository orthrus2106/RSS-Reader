export default (path, value, i18n) => {
  const feedBack = document.querySelector('#feedback');
  const input = document.querySelector('#url-input');
  if (path === 'uiState.error') {
    feedBack.textContent = i18n.t(`errors.${value}`);
    input.classList.add('is-invalid');
  }
  if (path === 'uiState.error' && value === null) {
    input.classList.remove('is-invalid');
    feedBack.textContent = '';
  }
};
