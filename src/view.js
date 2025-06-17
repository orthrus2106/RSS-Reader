import onChange from 'on-change';
import render from './render';

export default (state, i18n) => onChange(state, (path, value) => {
  render(path, value, i18n);
});
