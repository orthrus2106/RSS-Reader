import axios from 'axios';
import _ from 'lodash';

const formatUrl = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/');
  proxyUrl.pathname = 'get';
  proxyUrl.searchParams.append('disableCache', true);
  proxyUrl.searchParams.append('url', url);
  return proxyUrl.href.toString();
};

const parseRss = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const feedId = _.uniqueId('feed-');

  const feed = {
    id: feedId,
    title: feedTitle,
    description: feedDescription,
  };

  const items = [...doc.querySelectorAll('item')];
  const posts = items.map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postLink = item.querySelector('link').textContent;
    const postDescription = item.querySelector('description').textContent;
    const postId = _.uniqueId('post-');
    return {
      id: postId, feedId, title: postTitle, link: postLink, description: postDescription,
    };
  });

  return { feed, posts };
};

export default (url) => axios.get(formatUrl(url))
  .then((response) => {
    const xml = response.data.contents;
    return parseRss(xml);
  })
  .catch(() => {
    throw new Error('networkError');
  });
