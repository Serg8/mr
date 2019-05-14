
function loadJson() { 

  const xhr = new XMLHttpRequest();
  const url = "https://cors.io/?http://www.mrsoft.by/data.json";
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      try {
        const jsonData = JSON.parse(xhr.responseText).data;
        const input = document.getElementById("searchText");
        const output = document.getElementById("output");
        const filterByNumber = document.getElementById("filterByNumber");
        const filterBySubstring = document.getElementById("filterBySubstring");
        filterByNumber.addEventListener('click', function() {
          if(input.value === '') {
            validation(output);
          }else{
            filterNumber(jsonData, input.value, output);
          }
        });
        filterBySubstring.addEventListener('click', function() {
          if(input.value === '') {
            validation(output);
          }else{
            filterSubstring(jsonData, input.value, output);
          }
        });

      } catch(e) {
        console.log( "Некорректный ответ " + e.message );
      }
      
    }
  }

}


loadJson();



function filterNumber(jsonData, inputValue, output) {
  let num = +inputValue;
  let list = [];
  if(!isNaN(num)) {
    if(Array.isArray(jsonData)) list = jsonData.filter(item => item.length > num);
    output.innerHTML = (list.length === 0)? "<span class='red'>Нет слов такой длины</span>" : list;
  }else{
    output.innerHTML = "<span class='red'>Неверное число</span>";
  }
}

function filterSubstring(jsonData, inputValue, output) {
  let list = [];
  let checkbox = document.getElementById("searchCheckbox");
  if(checkbox.checked && Array.isArray(jsonData)) {
    list = jsonData.filter(item => item.includes(inputValue));
  }else{
    list = jsonData.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()));
  }
  output.innerHTML = (list.length === 0)? "<span class='red'>Нет слов содержащих подстроку " + inputValue + "</span>" : list;
}

function validation(output) {
  output.innerHTML = "<span class='red'>Введите число или строку</span>";
}


