async function getData() {
  const spreadsheetId = '19xnz_6lgix-sVwVKqmfl0i5WN9er95Ovy1IORNvt6ms'
  const apiKey = 'AIzaSyBtFFYvFH7CQEymAjWW_gcGvNzReWt53oU';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${apiKey}&includeGridData=true`;
  console.log("A");
  const result = await fetch(url);
  console.log("B");
  const { sheets } = await result.json();
  console.log("C");
  const eventSheet = sheets[0];
  const data = eventSheet.data[0].rowData
      .filter((_, index) => index !== 0) // Mulai dari index 1 (menghindari nama kolom)
      .map(row => {
          const { values } = row;
          return {
              C1: values[0].formattedValue,
              C2: values[1].formattedValue,
              C3: values[2].formattedValue,
              C4: values[3].formattedValue,			  
          }
      })
  return data;
}

function dataItemTemplate(item) {
  return (
    `<li class="cbss">
      <p class="important" >${item.C1}</p>
      <p class="important" >${item.C2}</p>
      <p>${item.C3}</p>
      <p>${item.C4}</p>
    </li>`
  )
}

async function renderData() {
  const wrapperDOM = document.getElementById('wrapper');
  try {
    const data = await getData();
    wrapperDOM.innerHTML = data.map(item => dataItemTemplate(item)).join('');
  } catch (error) {
    wrapperDOM.innerHTML = error
  }
}

renderData();
