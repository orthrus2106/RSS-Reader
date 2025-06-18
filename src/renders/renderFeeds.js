export default (state, i18n) => {
  const feeds = document.querySelector('#feeds');
  feeds.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('elements.feeds');

  cardBody.append(h2);
    console.log('it is render')
  const ul = document.createElement('ul');
  container.append(cardBody, ul);
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  state.feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.className = 'list-group-item border-0 border-end-0';
    const h3 = document.createElement('h3');
    h3.className = 'h6 m-0';
    h3.textContent = feed.title;

    const p = document.createElement('p');
    p.className = 'm-0 small text-black-50';
    p.textContent = feed.description;

    li.append(h3, p);
    ul.append(li);
  });
  feeds.append(container);
};
