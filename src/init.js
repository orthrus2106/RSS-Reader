import * as yup from 'yup';
import createWatchedState from './view';

export default () => {
  const state = {
    uiState: {
      error: null,
      status: 'valid', // invalid, sending
    },
    feeds: [],
  };

  const watchedState = createWatchedState(state);
  const schema = yup.string()
    .required()
    .url('Ссылка должна быть валидным URL')
    .test('is-unique', 'RSS уже существует', (value) => !watchedState.feeds.includes(value));

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputData = formData.get('input');
    schema.validate(inputData)
      .then(() => {
        watchedState.feeds.push(inputData);
        watchedState.uiState.status = 'valid';
        watchedState.uiState.error = null;
        form.elements.input.value = '';
      })
      .catch((err) => {
        watchedState.uiState.error = err.message;
        watchedState.uiState.status = 'invalid';
      });
  });
};
