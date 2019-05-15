function filterNumber(jsonData, inputValue, output) {
  const num = +inputValue;
  const result = output;
  let list = [];
  if (!Number.isNaN(num)) {
    if (Array.isArray(jsonData)) list = jsonData.filter(item => item.length > num);
    result.innerHTML = (list.length === 0) ? '<span class="red">Нет строк такой длины</span>' : list;
  } else {
    result.innerHTML = "<span class='red'>Неверное число</span>";
  }
}

function filterSubstring(jsonData, inputValue, output) {
  let list = [];
  const result = output;
  const checkbox = document.querySelector('#searchCheckbox');
  if (checkbox.checked && Array.isArray(jsonData)) {
    list = jsonData.filter(item => item.includes(inputValue));
  } else {
    list = jsonData.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()));
  }
  result.innerHTML = (list.length === 0) ? `<span class="red">Нет строк содержащих подстроку ${inputValue}</span>` : list;
}

function validation(output) {
  const result = output;
  result.innerHTML = "<span class='red'>Введите число или строку</span>";
}

function loadJson() {
  const xhr = new XMLHttpRequest();
  const url = 'https://cors.io/?http://www.mrsoft.by/data.json';
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = function onreadystatechange() {
    if (xhr.readyState !== 4) return;
    if (xhr.status !== 200) {
      console.warn(`${xhr.status} : ${xhr.statusText}`);
    } else {
      try {
        const jsonData = JSON.parse(xhr.responseText).data;
        const input = document.querySelector('#searchText');
        const output = document.querySelector('#output');
        const filterByNumber = document.querySelector('#filterByNumber');
        const filterBySubstring = document.querySelector('#filterBySubstring');
        filterByNumber.addEventListener('click', () => {
          if (input.value === '') {
            validation(output);
          } else {
            filterNumber(jsonData, input.value, output);
          }
        });
        filterBySubstring.addEventListener('click', () => {
          if (input.value === '') {
            validation(output);
          } else {
            filterSubstring(jsonData, input.value, output);
          }
        });
      } catch (e) {
        console.error(`Некорректный ответ ${e.message}`);
      }
    }
  };
}

loadJson();
