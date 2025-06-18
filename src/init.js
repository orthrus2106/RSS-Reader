import * as yup from 'yup';
import i18nextInstance from 'i18next';
import createWatchedState from './renders/view';
import resources from './locales/index';

export default async () => {
  const state = {
    uiState: {
      error: null,
      status: 'valid', // invalid, sending
    },
    feeds: [],
    language: 'ru',
  };
  const i18n = i18nextInstance.createInstance();

  await i18n.init({
    lng: state.language,
    debug: false,
    resources,
  });

  yup.setLocale({
    string: {
      url: i18n.t('errors.invalidUrl'),
    },
    mixed: {
      notOneOf: i18n.t('errors.alreadyExists'),
    },
  });

  const watchedState = createWatchedState(state, i18n);
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
      (value) => !state.feeds.includes(value.trim()),
    );

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputData = formData.get('input').trim();
    schema.validate(inputData)
      .then(() => {
        watchedState.feeds.push(inputData.trim());
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
