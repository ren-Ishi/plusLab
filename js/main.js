async function fetchData() {
  try {
    const response = await fetch('db.json');
    const jsonData = await response.json();
    
    const newpostBox = document.getElementById('newpost-box');
    const newPosts = jsonData.data.slice(-4);

    newPosts.forEach(item => {
      const postP = document.createElement('p');
      const postDiv = document.createElement('div');
      const postImg = document.createElement('img');
      const postTag = document.createElement('h5');
      const tagsString = item.tag.map(tag => `#${tag}`).join(' ');

      postDiv.classList.add('post-div');
      postImg.classList.add('post-img');
      postP.innerHTML = item.title;
      postTag.innerHTML = tagsString;

      postDiv.appendChild(postImg);
      postDiv.appendChild(postP);
      postDiv.appendChild(postTag);
      newpostBox.appendChild(postDiv);
    });
  } catch (error) {
    console.error('データの取得中にエラーが発生しました', error);
  }
}

fetchData();
