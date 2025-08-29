// app.js (patched)

var poemaOrig;
var noColumns;
var noRowsPerParagraph;
var noParagraph;

var body;
var order;

// Ensure DOM is ready before we query elements
document.addEventListener('DOMContentLoaded', initDemo);
//poemaOrig = [ 
// 
// [ 
// 
// ["toda roca ", "nace de lo que es "], 
// ["muere ", "nace la piedra ", , , ], 
// [ "nace ", "y muere de lo que es " ] 
// ], 
// 
// [ 
// ["roca ", "piedra " ], 
// ["lo que somos ", "sobre nuestra piel "], 
// ["lo que resistimos ", "bajo ella " , "y continuó el trabajo "] 
// ], 
// 
// [ 
// ["piedra ", "dijo el pedrero piedra " ], 
// ["del muro ", "miró la maldición de la labor " ], 
// [ "y de la piedra " , "y continuó el trabajo "] 
// ] 
// ]
function initDemo() {
  body = document.getElementById('generatedPoem');
  // Do NOT call reorder() here; wait until poemaOrig is set after loading the file.
}

// Expose a helper the loader can call after parsing the file:
//   window.setPoema(poema);
// This sets the global and kicks off the first render.
window.setPoema = function (poema) {
  poemaOrig = poema;
  if (typeof reorder === 'function') reorder();
};

function randomize() {
  if (!order) return;
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  newSelection();
}

function reorder() {
  if (!poemaOrig || !Array.isArray(poemaOrig)) return;
  order = [];
  for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
    for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
      for (var verNo = 0; verNo < 2; verNo++) {
        order.push([AorB, poemNo, verNo]);
      }
    }
  }
  newSelection();
}

// Helper: get order triplet from verse ID (e.g., "verse-012" => [0, 1, 2])
function parseId(id) {
  return id.replace('verse-', '').split('').map(Number);
}

function addHoverListeners() {
  let firstSelected = null;
  const verses = document.querySelectorAll('.generatedVerse');
  const originalVerses = document.querySelectorAll('.originalPoem span[id^="verse-"]');

  verses.forEach((verse, index) => {
    verse.addEventListener('mouseenter', () => {
      verse.classList.add('highlighted');
      const id = verse.dataset.verse;
      const originalLine = document.getElementById(id);
      if (originalLine) originalLine.classList.add('highlighted');
    });

    verse.addEventListener('mouseleave', () => {
      verse.classList.remove('highlighted');
      const id = verse.dataset.verse;
      const originalLine = document.getElementById(id);
      if (originalLine) originalLine.classList.remove('highlighted');
    });

    verse.addEventListener('click', () => {
      if (!firstSelected) {
        firstSelected = { element: verse, index };
        verse.classList.add('selected');
      } else if (firstSelected.element.classList.contains('originalVerse')) {
        const origId = firstSelected.element.id;
        const parsed = parseId(origId);

        const previousId = verse.dataset.verse;

        verse.textContent = firstSelected.element.textContent;
        verse.dataset.verse = origId;

        order[index] = parsed;

        document.querySelectorAll('.originalVerse').forEach(el => {
          el.classList.remove('copiedFrom', 'overwritten');
        });

        const countOfOld = [...document.querySelectorAll('.generatedVerse')].filter(el => el.dataset.verse === previousId).length;

        const oldOrig = document.getElementById(previousId);
        //if (countOfOld === 0 && oldOrig) {
        //  oldOrig.classList.add('overwritten');
        //}

        firstSelected.element.classList.remove('selected');
        firstSelected = null;
      } else if (firstSelected.element === verse) {
        verse.classList.remove('selected');
        firstSelected = null;
      } else {
        const tempText = firstSelected.element.textContent;
        const tempData = firstSelected.element.dataset.verse;

        firstSelected.element.textContent = verse.textContent;
        firstSelected.element.dataset.verse = verse.dataset.verse;

        verse.textContent = tempText;
        verse.dataset.verse = tempData;

        const tempOrder = order[firstSelected.index];
        order[firstSelected.index] = order[index];
        order[index] = tempOrder;

        firstSelected.element.classList.remove('selected');
        firstSelected = null;
      }
    });
  });

  originalVerses.forEach(orig => {
    orig.addEventListener('mouseenter', () => {
      orig.classList.add('highlighted');
      const id = orig.id;
      const generated = document.querySelector(`.generatedVerse[data-verse="${id}"]`);
      if (generated) generated.classList.add('highlighted');
    });

    orig.addEventListener('mouseleave', () => {
      orig.classList.remove('highlighted');
      const id = orig.id;
      const generated = document.querySelector(`.generatedVerse[data-verse="${id}"]`);
      if (generated) generated.classList.remove('highlighted');
    });

    orig.addEventListener('click', () => {
      if (firstSelected && firstSelected.element.classList.contains('originalVerse')) {
        firstSelected.element.classList.remove('selected');
      }
      firstSelected = { element: orig };
      orig.classList.add('selected');
    });
  });
}

function newSelection() {
  // Guard against missing DOM or data
  if (!body) body = document.getElementById('generatedPoem');
  if (!body || !poemaOrig || !order) return;

  body.innerHTML = '';

  var modecur = parseFloat(document.getElementById('mode').value);

  if (modecur == 1) {
    noParagraph = 1;
    noColumns = 1;
    noRowsPerParagraph = 6 * 3;
    WriteVerso(order);
  } else if (modecur == 2) {
    noParagraph = 3;
    noColumns = 2;
    noRowsPerParagraph = 3;
    WriteEstrofa(order);
  } else if (modecur == 3) {
    noParagraph = 1;
    noColumns = 1;
    noRowsPerParagraph = 6 * 3;
    WriteProsa(order);
  } else if (modecur == 4) {
    noParagraph = 3;
    noColumns = 1;
    noRowsPerParagraph = 3;
    WriteOriginal(order);
  }
  addHoverListeners();
}

function createCell(text, verseID) {
  var verseId = 'verse-' + verseID;
  var cell = document.createElement('td');

  var span = document.createElement('span');
  span.classList.add('generatedVerse');
  span.dataset.verse = verseId;
  span.textContent = text;
  cell.style.textAlign = 'center';
  cell.style.verticalAlign = 'middle';

  cell.appendChild(span);
  return cell;
}

// WriteEstrofa
function WriteEstrofa(order) {
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  var counter = 0;
  for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
    for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
      var row = document.createElement('tr');

      for (var col = 0; col < noColumns; col++) {
        if (counter >= order.length) break;

        var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

        var cell = document.createElement('td');
        cell.style.verticalAlign = 'middle';
        cell.style.textAlign = 'center';
        cell.style.padding = '10px 100px';

        var span = document.createElement('span');
        span.classList.add('generatedVerse');
        span.dataset.verse = verseId;
        span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]];

        cell.appendChild(span);
        row.appendChild(cell);

        counter++;
      }

      tblBody.appendChild(row);
    }

    var emptyRow = document.createElement('tr');
    var separatorCell = document.createElement('td');

    separatorCell.colSpan = 2;
    separatorCell.textContent = '____';
    separatorCell.style.textAlign = 'center';
    separatorCell.style.padding = '10px 0';

    emptyRow.appendChild(separatorCell);
    tblBody.appendChild(emptyRow);
  }

  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

// WriteProsa
function WriteProsa(order) {
  var paragraph = document.createElement('p');
  paragraph.style.textAlign = 'justify';
  paragraph.style.padding = '20px';
  paragraph.style.color = 'black';

  var counter = 0;
  for (var paragraphIndex = 0; paragraphIndex < noParagraph; paragraphIndex++) {
    for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
      var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

      var span = document.createElement('span');
      span.classList.add('generatedVerse');
      span.dataset.verse = verseId;
      span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]] + ' ';

      paragraph.appendChild(span);
      counter++;
    }
  }

  body.appendChild(paragraph);
}

// WriteOriginal
function WriteOriginal(order) {
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  var counter = 0;
  for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
    for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
      var row = document.createElement('tr');
      for (var partVerse = 0; partVerse < 2; partVerse++) {
        var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

        var cell = document.createElement('td');

        var span = document.createElement('span');
        span.classList.add('generatedVerse');
        span.dataset.verse = verseId;
        span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]];
        if (counter % 2 == 0) {
          cell.style.verticalAlign = 'right';
          cell.style.textAlign = 'right';
        } else {
          cell.style.verticalAlign = 'left';
          cell.style.textAlign = 'left';
        }
        cell.appendChild(span);

        row.appendChild(cell);
        counter++;
      }

      tblBody.appendChild(row);
    }
    var emptyRow = document.createElement('tr');

    var separatorCell = document.createElement('td');
    separatorCell.colSpan = 3;
    separatorCell.textContent = '____';
    separatorCell.style.textAlign = 'center';
    separatorCell.style.padding = '10px 0';

    emptyRow.appendChild(separatorCell);
    tblBody.appendChild(emptyRow);
  }

  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

// FormatCortina (unchanged)
function FormatCortina(order) {
  // ...
}

// WriteVerso
function WriteVerso(order) {
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  var counter = 0;
  for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
    for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
      var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

      var row = document.createElement('tr');

      var cell = document.createElement('td');

      var span = document.createElement('span');
      span.classList.add('generatedVerse');
      span.dataset.verse = verseId;
      span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]];
      cell.style.textAlign = 'center';
      cell.style.verticalAlign = 'middle';

      cell.appendChild(span);

      row.appendChild(cell);
      tblBody.appendChild(row);
      counter++;
    }
  }

  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}
