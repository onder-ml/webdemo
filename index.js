 
function isEven(n) {
  return n % 2 == 0;
}

function inputItems(json) {
  // get outputs
  const categories = ["landscape", "plumbing", "electrical", "roof", "exterior", "interior", "appliances", "hvac", "structure", "garage", "kitchen", "irrelevant"]


  // go thru all the category tables
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    var table = document.getElementById(category + "Table");
    items = json['filtered'][category]['content']
    for (let index = 0; index < items.length; index++) {
      const item = items[index]['text'] + " (Page " + items[index]['page'] + ")";
      var bgColor = '#ffffff'
      if (isEven(index) == false) {
        bgColor = '#ededed'
      }
      var newElement = '<tr style="background-color:' + bgColor + ';"><td class="u-table-cell">' + item + '</td></tr>'
      table.insertAdjacentHTML('beforeend', newElement)
    }
  }
}

function parseInput(input) {
    try {
      var json = typeof(input) === 'string' ? JSON.parse(input) : input
    } catch (err) {
      console.log(input);
      throw err;
    }
    return json;
}
  
function readFile(file) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (event) {
    json = parseInput(event.target.result)
    console.log(json)
    inputItems(json)
  };
}
  
function fileListeners() {
  const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
      const file = event.target.files[0];
      readFile(file)
  });
}
  