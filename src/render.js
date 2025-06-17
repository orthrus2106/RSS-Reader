export default (path, value) => {
  const feedBack = document.querySelector('#feedback');
  const input = document.querySelector('#url-input');
  if (path === 'uiState.error') {
    feedBack.textContent = value;
    input.classList.add('is-invalid');
  }
  if (path === 'uiState.error' && value === null) {
    input.classList.remove('is-invalid');
  }
};
