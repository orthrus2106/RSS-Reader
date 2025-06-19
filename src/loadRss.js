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
    const feedId = _.uniqueId('feed-');
    watchedState.feeds.push({ id: feedId, title, description });
    const items = doc.querySelectorAll('item');
    items.forEach((item) => {
      const postTitle = item.querySelector('title').textContent;
      const postLink = item.querySelector('link').textContent;
      const postDescription = item.querySelector('description').textContent;
      const postId = _.uniqueId('post-');
      watchedState.posts.push({
        id: postId, feedId, title: postTitle, link: postLink, description: postDescription,
      });
    });
    // console.log(watchedState.posts);
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
