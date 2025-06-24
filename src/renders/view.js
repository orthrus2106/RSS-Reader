import onChange from 'on-change';
import renderErrors from './renderErrors';
import statusHandler from './statusHandler';
import renderFeeds from './renderFeeds';
import renderPosts from './renderPosts';
import renderModal from './renderModal';

export default (state, i18n) => onChange(state, (path, value) => {
  if (path === 'uiState.error') {
    renderErrors(state, value, i18n);
  }
  if (path === 'uiState.status') {
    statusHandler(path, value, i18n);
  }
  if (path === 'feeds') {
    renderFeeds(state, i18n);
  }
  if (path === 'posts' || path === 'uiState.watchedPosts') {
    renderPosts(state, i18n);
  }
  if (path === 'uiState.openedPostId') {
    renderModal(state);
  }
});
