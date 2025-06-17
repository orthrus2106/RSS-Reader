import onChange from 'on-change';
import render from './render';

export default (state) => onChange(state, (path, value) => {
  render(path, value);
});
