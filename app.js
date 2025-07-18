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

function GenerateOriginal()
{
    //random order tercero
    order = [] 
    for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
        order.push([])
        for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
            AorBPlus = AorB+1
            rowPPlus = rowP+1
            var elemList = parseFloat(document.getElementById("p3poem"+ AorBPlus + rowPPlus).value)-1
            order[AorB].push(elemList)
        }
    }
    
    if(randomNow){
        order = [] 
        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            order.push([])
            for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
                order[AorB].push(rowP)
            }
        }

        order[0] = shuffle(order[0])
        order[1] = shuffle(order[1])
        
        randomNow = false

        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
                AorBPlus = AorB+1
                rowPPlus = rowP+1
                document.getElementById("p3poem"+ AorBPlus + rowPPlus).value = order[AorB][rowP]+1
            }
        }

    }
    noVerses = poemaOrig[0][0].length
    noRows = poemaOrig[0].length
    WriteOriginal(order)
}

function GenerateVerso(){
    
        document.getElementById("selectProsa").style.display = "none"
        document.getElementById("selectOriginal").style.display = "none"
        document.getElementById("orderCortina").style.display = "none"
        document.getElementById("selectVerso").style.display = "inline"
        document.getElementById("selectVerso").style.visibility = "visible"

        //random order FormatVerso
        noVerses = poemaOrig[0][0].length
        order = [] 
        elemI = 1
        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
                for(var verNo = 0; verNo < noVerses; verNo++){
                    var elemList = document.getElementById("p5poem"+ elemI).value
                    elemI++
                    var AorBCur =  elemList.charCodeAt(0) - 65
                    var poemCur = elemList.charCodeAt(1) - 49
                    var verseCur = elemList.charCodeAt(2) - 49

                    order.push([AorBCur, poemCur, verseCur])
                }
            }
        }

        noRows = order.length

        if(randomNow){
            order = [] 
            for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
                for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
                    for(var verNo = 0; verNo < noVerses; verNo++){
                        order.push([AorB, poemNo, verNo])
                    }
                }
            }

            order = shuffle(order)
            randomNow = false

            for (var i = 0; i < order.length; i++) {
                letter = String.fromCharCode(order[i][0] + 65)
                number = String.fromCharCode(order[i][1] + 49)
                verse = String.fromCharCode(order[i][2] + 49)

                var iPlus = i+1

                document.getElementById("p5poem"+ iPlus).value = letter.concat(number, verse)
                    
            }
        }
        
        WriteVerso(order)
}

function GenerateEstrofa(){
    document.getElementById("selectProsa").style.display = "inline"
    document.getElementById("selectProsa").style.visibility = "visible"
    document.getElementById("selectOriginal").style.display = "none"
    document.getElementById("orderCortina").style.display = "none"
    document.getElementById("selectVerso").style.display = "none"

    //random order primero y segundo
    order = []
    elementList = 1
    for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
        for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
            var elemList = document.getElementById("p1poem"+elementList).value
            elementList++
            order.push([elemList.charCodeAt(0) - 65, elemList.charCodeAt(1) - 49])
        }
    }
    
    if(randomNow){

        order = []
        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
                order.push([AorB, rowP])
            }
        }

        order = shuffle(order)
        
        randomNow = false

        elementList = 1
        for (var i = 0; i < order.length; i++) {
            letter =  String.fromCharCode(order[i][0] + 65)
            number =  String.fromCharCode(order[i][1] + 49)
            document.getElementById("p1poem"+elementList).value = letter.concat(number)
            elementList++
        }
    }


    
    noColumns = 1;
    noRows = poemaOrig[0].length + poemaOrig[1].length;
    noVerses = poemaOrig[0][0].length
    WriteEstrofa(order)
}

function GenerateProsa(){
    document.getElementById("selectProsa").style.display = "inline"
    document.getElementById("selectProsa").style.visibility = "visible"
    document.getElementById("selectOriginal").style.display = "none"
    document.getElementById("orderCortina").style.display = "none"
    document.getElementById("selectVerso").style.display = "none"

    //random order primero y segundo
    order = []
    elementList = 1
    for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
        for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
            var elemList = document.getElementById("p1poem"+elementList).value
            elementList++
            order.push([elemList.charCodeAt(0) - 65, elemList.charCodeAt(1) - 49])
        }
    }
    
    if(randomNow){
        order = []
        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            for (var rowP = 0; rowP < poemaOrig[AorB].length; rowP++) {
                order.push([AorB, rowP])
            }
        }

        order = shuffle(order)
        randomNow = false

        elementList = 1
        for (var i = 0; i < order.length; i++) {
            letter =  String.fromCharCode(order[i][0] + 65)
            number =  String.fromCharCode(order[i][1] + 49)
            document.getElementById("p1poem"+elementList).value = letter.concat(number)
            elementList++
        }
    }

    noVerses = poemaOrig[0][0].length
    WriteProsa(order)
}

function Cortina(){
    
        document.getElementById("selectProsa").style.display = "none"
        document.getElementById("selectOriginal").style.display = "none"
        document.getElementById("orderCortina").style.display = "inline"
        document.getElementById("orderCortina").style.visibility = "visible"
        document.getElementById("selectVerso").style.display = "none"

        //random order FormatCortina
        noVerses = poemaOrig[0][0].length
        noRows = poemaOrig[0].length

        order = [] 
        for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
            order.push([])
            for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
                for(var verNo = 0; verNo < noVerses; verNo++){
                    var AorBPlus = AorB+1
                    var poemPlus = poemNo+1
                    var verPlus = verNo+1
                    var elemList = document.getElementById("p4poem"+ AorBPlus + poemPlus + verPlus).value
                    var poem = elemList.charCodeAt(0) - 49
                    var verse = elemList.charCodeAt(1) - 49
                    order[AorB].push([poem, verse])
                }
            }
        }
        
        if(randomNow){
            order = [] 
            for (var AorB = 0; AorB < poemaOrig.length; AorB++) {
                order.push([])
                for (var poemNo = 0; poemNo < poemaOrig[AorB].length; poemNo++) {
                    for(var verNo = 0; verNo < noVerses; verNo++){
                        order[AorB].push([poemNo, verNo])
                    }
                }
            }

            order[0] = shuffle(order[0])
            order[1] = shuffle(order[1])
            randomNow = false

            for (var AorB = 0; AorB < order.length; AorB++) {
                for (var poemNo = 0; poemNo < order[AorB].length; poemNo++) {
                    var AorBPlus = AorB+1
                    var poemPlus = Math.floor(poemNo/poemaOrig[AorB].length)+1
                    var verPlus = Math.floor(poemNo%noVerses)+1
                    poemCur = (order[AorB][poemNo][0]+1).toString(10)
                    verseCur = (order[AorB][poemNo][1]+1).toString(10)
                    document.getElementById("p4poem"+ AorBPlus + poemPlus + verPlus).value = poemCur.concat("" , verseCur)
                }
            }
        }
        
        FormatCortina(order)
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

function translate(order){
    newOrd = []
    for(i = 0 ; i < order.length; i++){
        emp = []
        emp.push(order[i].charCodeAt(0) - 65)
        emp.push(order[i].charCodeAt(1) - 49)
        newOrd.push(emp) 
    }
    return newOrd
}

function translateReverse(order){
    newOrd = []
    for(i = 0 ; i < order.length; i++){
        var letter = String.fromCharCode(order[i][0] + 65)
        var row = String.fromCharCode(order[i][1] + 49)
        newOrd.push(letter.concat(row)) 
    }
    return newOrd
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

function translateReverseTer(order){
    newOrd = []
    for(i = 0 ; i < order[0].length; i++){
        var letterA = "A"
        var rowA = String.fromCharCode(order[0][i] + 49)
        var letterB = "B"
        var rowB = String.fromCharCode(order[1][i] + 49)
        newOrd.push(letterA.concat(rowA, "-", letterB, rowB)) 
    }
    return newOrd
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

function translateReverseCuar(order){
    newOrd = []
    for(i = 0 ; i < order[0].length; i++){
        var letterA = "A"
        var poemA = String.fromCharCode(order[0][i][0] + 49)
        var verA = String.fromCharCode(order[0][i][1] + 49)
        var letterB = "B"
        var poemB = String.fromCharCode(order[1][i][0] + 49)
        var verB = String.fromCharCode(order[1][i][1] + 49)
        newOrd.push(letterA.concat(poemA, verA, "-", letterB, poemB, verB)) 
    }
    return newOrd
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

function translateReverseQuin(order){
    newOrd = []
    for(i = 0 ; i < order.length; i++){
        var letter = String.fromCharCode(order[i][0] + 65)
        var poem = String.fromCharCode(order[i][1] + 49)
        var ver = String.fromCharCode(order[i][2] + 49)
        newOrd.push(letter.concat(poem, ver)) 
    }
    return newOrd
}





function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
