import * as yup from 'yup';
import onChange from 'on-change';
import view from './view';
import render from './render';

export default () => {
  const state = {
    uiState: {
      error: null,
      status: 'filling', // valid, invalid, sending
    },
    feeds: [],
  };
  const watchedState = onChange(state, view);
  const schema = yup.string()
    .required()
    .url('Ссылка должна быть валидным URL')
    .test('is-unique', 'RSS уже существует', (value) => !state.feeds.includes(value));

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputData = formData.get('input');
    schema.validate(inputData)
      .then(() => {
        state.feeds.push(inputData);
        state.uiState.status = 'valid';
        state.uiState.error = null;
        form.elements.input.value = '';
      })
      .catch((err) => {
        state.uiState.error = err.message;
        state.uiState.status = 'invalid';
      });
  });
};
