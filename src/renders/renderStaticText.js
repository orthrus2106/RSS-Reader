export default (i18n) => {
    const title = document.querySelector('#title')
    const subtitle = document.querySelector('#subtitle')
    const urlLabel = document.querySelector('#url-label')
    const addButton = document.querySelector('#add-button')
    const selectLanguageBtn = document.querySelector('#selectLanguageBtn')
    const selectRussian = document.querySelector('[data-lang="ru"]')
    const selectEnglish = document.querySelector('[data-lang="en"]')
    const postsContainer = document.querySelector('#posts')
    const feedsContainer = document.querySelector('#feeds')

    title.textContent = i18n.t('elements.title');
    subtitle.textContent = i18n.t('elements.subtitle');
    urlLabel.textContent = i18n.t('elements.placeholder');
    addButton.textContent = i18n.t('elements.button');
    selectLanguageBtn.textContent = i18n.t('languages.langBtn');
    selectRussian.textContent = i18n.t('languages.langRu');
    selectEnglish.textContent = i18n.t('languages.langEn');
    postsContainer.textContent = i18n.t('elements.emptyPosts');
    feedsContainer.textContent = i18n.t('elements.emptyFeeds');
}