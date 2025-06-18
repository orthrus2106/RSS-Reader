import onChange from 'on-change';
import renderErrors from './renderErrors';
import statusHandler from './statusHandler';
import renderFeeds from './renderFeeds';

export default (state, i18n) => onChange(state, (path, value) => {
  if (path === 'uiState.error') {
    renderErrors(path, value, i18n);
  }
  if (path === 'uiState.status') {
    statusHandler(path, value, i18n);
  }
  if (path === 'feeds') {
    renderFeeds(state, i18n);
    console.log('handler called')
  }
});
