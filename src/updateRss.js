import loadRss from './loadRss'

const updateRss = (watchedState) => {
  const { urls, posts } = watchedState
  const currentTitles = posts.map(post => post.title)
  const requests = urls.map(url => loadRss(url)
    .then(({ posts: currentPosts }) => {
      const freshPosts = currentPosts.filter(post => !currentTitles.includes(post.title))
      if (freshPosts.length > 0) {
        watchedState.posts.push(...freshPosts)
      }
    }))
  Promise.all(requests).finally(() => {
    setTimeout(() => updateRss(watchedState), watchedState.updateTime)
  })
}

export default updateRss
