console.log("This is a message for the console.");

// Define Variables
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// get buttons from website
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// function to log information about our viz
function logWorkbookInformation() {
  //   get name of workbook
  workbook = viz.workbook;
  console.log(`The workbook name is "${workbook.name}"`);

  //   get array of dashboards within workbook
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index ${index} is ${element.name} `);
  });

  //   find the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  //   list all worksheets in active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The worksheet with index ${index} is ${element.name}`);
  });
}

// function to filter only for oregon and washington
function oregonWashingtonFunction() {
  console.log(oregonWashingtonButton.value);

  // apply filter to sheets
  listSheets.forEach((element) => {
    element.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  });
}

// function to clear state filter
function clearStateFilter() {
  console.log(clearFilterButton.value);

  listSheets.forEach((element) => {
    element.clearFilterAsync("State");
  });
}

// function to undo filter
function undoFilter() {
  console.log(undoButton.value);

  viz.undoAsync();
}

oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", undoFilter);

viz.addEventListener("firstinteractive", logWorkbookInformation);
