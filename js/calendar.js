async function fetchData() {
  try {
    const response = await fetch('calendarDB.json');
    const jsonData = await response.json();
    
    const calendarBox = document.getElementById('calendar-box');
    const newPosts = jsonData.data.slice(-6);

    newPosts.forEach(item => {
      const postP = document.createElement('p');
      const postDiv = document.createElement('div');
      const postTag = document.createElement('h5');
      const postDate = document.createElement('h4');
      const tagsString = item.tag.map(tag => `#${tag}`).join(' ');

      postDiv.classList.add('post-div');
      postP.innerHTML = item.title;
      postTag.innerHTML = tagsString;
      postDate.innerHTML = item.date;

      postDiv.appendChild(postDate);
      postDiv.appendChild(postP);
      postDiv.appendChild(postTag);
      calendarBox.appendChild(postDiv);
    });
  } catch (error) {
    console.error('データの取得中にエラーが発生しました', error);
  }
}

fetchData();


function generateCalendar(year, month) {
  var firstDay = new Date(year, month - 1, 1);
  var lastDay = new Date(year, month, 0);
  var daysInMonth = lastDay.getDate();
  var startingDay = firstDay.getDay();

  var table = document.getElementById("calendar");

  var dayCount = 1;
  var rowIndex = 1;
  for (var i = 0; i < 6; i++) {
    var row = table.rows[rowIndex];
    if (!row) {
      row = document.createElement("tr");
      table.appendChild(row);
    }
    for (var j = 0; j < 7; j++) {
      console.log(dayCount, day);
      var cell = row.cells[j] || document.createElement("td");
      if (i === 0 && j < startingDay) {
        cell.textContent = "";
      } else if (dayCount <= daysInMonth) {
        cell.textContent = dayCount;
        if (day === dayCount) {
          cell.setAttribute("id", "today");
        }
        dayCount++;
      } else {
        cell.textContent = "";
      }
      if (!row.cells[j]) {
        row.appendChild(cell);
      }
    }
    rowIndex++;
    if (dayCount > daysInMonth) {
      break;
    }
  }
}

// 現在の日付を取得
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();

// カレンダーを生成
generateCalendar(year, month);
