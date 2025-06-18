import onChange from 'on-change';
import renderErrors from './renderErrors';

export default (state, i18n) => onChange(state, (path, value) => {
  if (path === 'uiState.error') {
    renderErrors(path, value, i18n);
  }
});
