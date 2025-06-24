export default (state, i18n) => {
  const title = document.querySelector('#modalLabel');
  const body = document.querySelector('#modalBody');
  const button = document.querySelector('#readButton');
  const expectedPost = state.posts.find((post) => post.id === state.uiState.openedPostId);

  title.textContent = expectedPost.title;
  body.textContent = expectedPost.description;
  button.setAttribute('href', expectedPost.link);
};
