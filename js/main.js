async function fetchData() {
  try {
    const response = await fetch('js/db.json');
    const jsonData = await response.json();
    
    const dataContainer = document.getElementById('data-container');

    jsonData.data.forEach(item => {
      const dataElement = document.createElement('div');
      dataElement.innerHTML = `ID: ${item.id}, Name: ${item.name}`;
      dataContainer.appendChild(dataElement);
    });
  } catch (error) {
    console.error('データの取得中にエラーが発生しました', error);
  }
}

fetchData();
