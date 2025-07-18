var poemaOrig 
var noColumns
var noRowsPerParagraph
var noParagraph

var body 
var order

function initDemo() {
    poemaOrig = [
            [  
                ["toda roca ", "nace de lo que es "], 
                ["muere ", "nace la piedra ", , , ],
                [ "nace ", "y muere de lo que es " ]
            ],

            [   
                ["roca ", "piedra " ],
                ["lo que somos ", "sobre nuestra piel "],
                ["lo que resistimos ", "bajo ella " , "y continuó el trabajo "]
            ],
            
            [   
                ["piedra ", "dijo el pedrero piedra " ],
                ["del muro ", "miró la maldición de la labor " ],
                [ "y de la piedra " , "y continuó el trabajo "]
            ]
            ]

    body = document.getElementById("generatedPoem");

    elemI = 1
    reorder()
}

function randomize(){
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    newSelection()
}

function reorder(){
    order = []
    for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
        for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
            for(var verNo = 0; verNo < 2; verNo++){
                order.push([AorB, poemNo, verNo])
            }
        }
    }
    newSelection()
}

function addHoverListeners() {
  // Select all generated verses
  const verses = document.querySelectorAll('.generatedVerse');

  verses.forEach(verse => {
    verse.addEventListener('mouseenter', () => {
        verse.classList.add('highlighted')
        const id = verse.dataset.verse;
        const originalLine = document.getElementById(id);
        if (originalLine) originalLine.classList.add('highlighted');
    });

    verse.addEventListener('mouseleave', () => {
        verse.classList.remove('highlighted')
        const id = verse.dataset.verse;
        const originalLine = document.getElementById(id);
        if (originalLine) originalLine.classList.remove('highlighted');
    });
  });
}

function newSelection(){
    body.innerHTML = "";
    var modecur = parseFloat(document.getElementById("mode").value)
    
    if(modecur==1){
        noParagraph =  1 
        noColumns = 1
        noRowsPerParagraph = 6*3
        WriteVerso(order)
    }
    else if(modecur==2){
        noParagraph =  3 
        noColumns = 2
        noRowsPerParagraph = 3
        WriteEstrofa(order)
    }
    else if(modecur==3){
        noParagraph =  1 
        noColumns = 1
        noRowsPerParagraph = 6*3
        WriteProsa(order)
    }
    else if(modecur==4){
        noParagraph =  3 
        noColumns = 1
        noRowsPerParagraph = 3
        WriteOriginal(order)
    }
    addHoverListeners();
}

function createCell(text, verseID){

    // Create cell content with a span holding a data attribute for matching
    var verseId ='verse-' +  verseID; // or however you get the unique ID, e.g., "A11"
    var cell = document.createElement("td")

    var span = document.createElement("span")
    span.classList.add("generatedVerse")
    span.dataset.verse = verseId
    span.textContent = text
    cell.style.textAlign = "center";
    cell.style.verticalAlign = "middle";

    cell.appendChild(span)
    return cell
}

//WriteEstrofa----------------------------------------------------------------------------------------------------------------------------------
function WriteEstrofa(order){

    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")
    // creating all cells
    var counter = 0
    for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
        for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
            var row = document.createElement("tr");

            for (var col = 0; col < noColumns; col++) {
                if (counter >= order.length) break; // avoid out-of-bounds

                var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

                var cell = document.createElement("td");
                cell.style.verticalAlign = "middle";
                cell.style.textAlign = "center";
                cell.style.padding = "10px 100px"; // space between the two columns

                var span = document.createElement("span");
                span.classList.add("generatedVerse");
                span.dataset.verse = verseId;
                span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]];

                cell.appendChild(span);
                row.appendChild(cell);

                counter++;
            }

            tblBody.appendChild(row);
        }

        // Separator row
        var emptyRow = document.createElement("tr");
        var separatorCell = document.createElement("td");

        separatorCell.colSpan = 2;
        separatorCell.textContent = "____";
        separatorCell.style.textAlign = "center";
        separatorCell.style.padding = "10px 0";

        emptyRow.appendChild(separatorCell);
        tblBody.appendChild(emptyRow);

    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
    // appends <table> into <body>
    body.appendChild(tbl)
}

//WriteProsa----------------------------------------------------------------------------------------------------------------------------------
function WriteProsa(order){
    var paragraph = document.createElement("p"); // create paragraph instead of table
    paragraph.style.textAlign = "justify"; // optional: justify the paragraph
    paragraph.style.padding = "20px"; // optional: spacing
    paragraph.style.color = "white"; // optional: visible on black background

    var counter = 0;
    for (var paragraphIndex = 0; paragraphIndex < noParagraph; paragraphIndex++) {
        for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
            var verseId = 'verse-' + order[counter][0] + order[counter][1] + order[counter][2];

            var span = document.createElement("span");
            span.classList.add("generatedVerse");
            span.dataset.verse = verseId;
            span.textContent = poemaOrig[order[counter][0]][order[counter][1]][order[counter][2]] + " ";

            paragraph.appendChild(span);
            counter++;
        
        }
    }

    body.appendChild(paragraph);
}

//FormatEstrofa----------------------------------------------------------------------------------------------------------------------------------
function WriteOriginal(order){


    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")
    // creating all cells
    var counter = 0
    for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
        for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
            
            var row = document.createElement("tr")
            for (var partVerse = 0; partVerse < 2; partVerse++) {
                var verseId ='verse-' +  order[counter ][0]+  order[counter][1] +  order[counter ][2]; // or however you get the unique ID, e.g., "A11"

                // creates a table row
                var cell = document.createElement("td")

                var span = document.createElement("span")
                span.classList.add("generatedVerse")
                span.dataset.verse = verseId
                span.textContent = poemaOrig[order[counter ][0]][order[counter][1]][order[counter ][2]]
                if(counter%2 == 0) {
                    cell.style.verticalAlign = "right";
                    cell.style.textAlign = "right";
                }
                else{
                    cell.style.verticalAlign = "left";
                    cell.style.textAlign = "left";
                }
                cell.appendChild(span)

                row.appendChild(cell); // append each partVerse's <td> into the same row
                counter++
            }

            // add the row to the end of the table body
            tblBody.appendChild(row)
        }
        var emptyRow = document.createElement("tr");

        // Create a <td> that spans across 3 columns (or 2 if you only use two columns)
        var separatorCell = document.createElement("td");
        separatorCell.colSpan = 3; // Ensure this matches your main poem row's number of cells
        separatorCell.textContent = "____";
        separatorCell.style.textAlign = "center"; // Center the text horizontally
        separatorCell.style.padding = "10px 0";   // Optional spacing

        // Append the cell to the row, and the row to the table
        emptyRow.appendChild(separatorCell);
        tblBody.appendChild(emptyRow);

    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
    // appends <table> into <body>
    body.appendChild(tbl)
}

//FormatCortina----------------------------------------------------------------------------------------------------------------------------------
function FormatCortina(order){
    //Rearrange poem
    poema = []
    
    for (var rowP = 0; rowP < noRows; rowP++) {
        poema.push([])
        for (var verseNo = 0; verseNo < noVerses; verseNo++) {
            poema[rowP].push([])
            partA = poemaOrig[0][order[0][rowP*3 + verseNo][0]][order[0][rowP*3 + verseNo][1]]
            partB = poemaOrig[1][order[1][rowP*3 + verseNo][0]][order[1][rowP*3 + verseNo][1]]
            poema[rowP][verseNo].push(partA.concat(" ", partB))
        }
    }

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    // creating all cells
    for (var rowP = 0; rowP < noRows; rowP++) {
        for (var verseNo = 0; verseNo < poema[rowP].length; verseNo++) {
            // creates a table row
            var row = document.createElement("tr")
            row.appendChild(createCell(poema[rowP][verseNo], order[rowP][verseNo]))

            // add the row to the end of the table body
            tblBody.appendChild(row)
            if(verseNo == poema[rowP].length-1 && rowP != poema.length-1){
                var emptyRow = document.createElement("tr")
                emptyRow.appendChild(createCell("____", null))
                tblBody.appendChild(emptyRow)
            }
        }
    }
    
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
    // appends <table> into <body>
    body.appendChild(tbl)
}

//FormatVerso----------------------------------------------------------------------------------------------------------------------------------
function WriteVerso(order){
    //Rearrange poem

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    var counter = 0
    // creating all cells
    for (var paragraph = 0; paragraph < noParagraph; paragraph++) {
        for (var rowP = 0; rowP < noRowsPerParagraph; rowP++) {
            var verseId ='verse-' +  order[counter][0] +  order[counter][1] +  order[counter][2]; // or however you get the unique ID, e.g., "A11"

            // creates a table row
            var row = document.createElement("tr")
            
            // Create cell content with a span holding a data attribute for matching
            var cell = document.createElement("td")

            var span = document.createElement("span")
            span.classList.add("generatedVerse")
            span.dataset.verse = verseId
            span.textContent =  poemaOrig[order[counter ][0]][order[counter][1]][order[counter ][2]]
            cell.style.textAlign = "center";
            cell.style.verticalAlign = "middle";

            cell.appendChild(span)

            row.appendChild( cell )
            tblBody.appendChild(row)
            counter++
        }
    }
    
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
    // appends <table> into <body>
    body.appendChild(tbl)

    
}
