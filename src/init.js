import * as yup from 'yup';
import i18nextInstance from 'i18next';
import createWatchedState from './renders/view';
import resources from './locales/index';
import loadRss from './loadRss';

export default async () => {
  const state = {
    uiState: {
      error: null,
      status: 'valid', // invalid, sending
      language: 'ru',
    },
    urls: [],
    feeds: [
    //   { id: 0, title: 'title', description: 'description' },
    ],
    posts: [
    //   { id: 0, feedId: feed-1, title: title, link: link , description: 'description'},
    ],
  };
  const i18n = i18nextInstance.createInstance();

  await i18n.init({
    lng: state.uiState.language,
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
      (value) => !state.urls.includes(value.trim()),
    );

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputData = formData.get('input').trim();
    schema.validate(inputData)
      .then(() => {
        watchedState.uiState.status = 'sending';

        return loadRss(inputData, watchedState)
          .then(({ feed, posts }) => {
            watchedState.feeds.push(feed);
            watchedState.posts.push(...posts);
            watchedState.urls.push(inputData.trim());
            watchedState.uiState.status = 'valid';
            watchedState.uiState.error = null;
          });
      })
      .catch((err) => {
        watchedState.uiState.error = err.message;
        watchedState.uiState.status = 'invalid';
      });
  });
};
