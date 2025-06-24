export default (state, i18n) => {
  const posts = document.querySelector('#posts');
  posts.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.textContent = i18n.t('elements.posts');
  h2.classList.add('card-title', 'h4');
  cardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  container.append(cardBody, ul);

  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';

    const a = document.createElement('a');
    a.classList.add(state.uiState.watchedPosts.includes(post.id) ? 'fw-normal' : 'fw-bold');
    a.textContent = post.title;
    a.setAttribute('href', post.link);
    a.setAttribute('data-id', post.id);
    a.setAttribute('rel', 'noopener noreferrer');

    const button = document.createElement('button');
    button.className = 'btn btn-outline-primary btn-sm';
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('elements.postButton');

    li.append(a, button);
    ul.append(li);
  });
  posts.append(container);
};
