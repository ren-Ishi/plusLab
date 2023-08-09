document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('postDB.json');
  const jsonData = await response.json();

  function renderPosts(data) {
    const postBox = document.getElementById('post-box');
    postBox.innerHTML = '';

    data.forEach(item => {
      const postDiv = document.createElement('div');
      const postP = document.createElement('p');
      const postTag = document.createElement('h5');
      const postDate = document.createElement('h6');
      const postImg = document.createElement('img');
      const tagsString = item.tag.map(tag => `#${tag}`).join(' ');

      postDiv.classList.add('post-div');
      postImg.classList.add('post-img');

      postP.textContent = item.title;
      postTag.textContent = tagsString;
      postDate.textContent = item.date;

      postDiv.appendChild(postImg);
      postDiv.appendChild(postP);
      postDiv.appendChild(postTag);
      postDiv.appendChild(postDate);

      postBox.appendChild(postDiv);
    });
  }

  function renderTagList(data) {
    const tagList = document.getElementById('tag-list');
    tagList.innerHTML = '';

    const allTags = [];

    data.forEach(item => {
      allTags.push(...item.tag);
    });

    const uniqueTags = [...new Set(allTags)];

    uniqueTags.forEach(tag => {
      const tagButton = document.createElement('button');
      tagButton.textContent = `#${tag}`;

      tagButton.addEventListener('click', function () {
        const filteredData = jsonData.data.filter(item => item.tag.includes(tag));
        renderPosts(filteredData);
      });

      tagList.appendChild(tagButton);
    });
  }

  function filterPostsByKeyword(keyword, data) {
    return data.filter(item => {
      const titleMatch = item.title.includes(keyword);
      const tagMatch = item.tag.some(tag => tag.includes(keyword));
      return titleMatch || tagMatch;
    });
  }

  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input');
    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === '') {
      renderPosts(jsonData.data);
      return;
    }

    const filteredData = filterPostsByKeyword(keyword, jsonData.data);
    renderPosts(filteredData);

    searchInput.value = ''; // 検索フォームをクリア
  });

  const resetButton = document.getElementById('reset-button');

  // リセットボタンのクリックイベントを追加
  resetButton.addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    searchInput.value = ''; // 検索フォームをクリア
    renderPosts(jsonData.data); // 元のデータを表示
  });

  // タグ一覧の表示
  renderTagList(jsonData.data);

  // 初回のデータ表示
  renderPosts(jsonData.data);
});
