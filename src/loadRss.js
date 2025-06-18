import axios from 'axios';
import _ from 'lodash';

const formatUrl = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/');
  proxyUrl.pathname = 'get';
  proxyUrl.searchParams.append('disableCache', true);
  proxyUrl.searchParams.append('url', url);
  return proxyUrl.href.toString();
};

const parseRss = (data, watchedState) => {
  try {
    const newParser = new DOMParser();
    const doc = newParser.parseFromString(data, 'application/xml');
    const title = doc.querySelector('title').textContent;
    const description = doc.querySelector('description').textContent;
    watchedState.feeds.push({ id: _.uniqueId('feed-'), title, description });
    // console.log(doc);
  } catch (err) {
    throw new Error(err);
  }
};

export default (url, watchedState) => axios.get(formatUrl(url))
  .then((response) => {
    const xml = response.data.contents;
    const parsingData = parseRss(xml, watchedState);
    return parsingData;
  });
