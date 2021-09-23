var poemaOrig 
var noColumns
var noRows

function initDemo() {
    poemaOrig = [[  ["toda roca", "muere", "nace"], 
                ["roca", "lo que somos", "lo que resistimos"],
                ["piedra", "del muro", "y de la piedra"]],

            [   ["nace de lo que es", "nace la piedra", "y muere de lo que es"],
                ["piedra", "sobre nuestra piel", "bajo ella"],
                ["dijo el pedrero piedra", "miró la maldición de la labor", "y continuó el trabajo"]]]

    document.getElementById("tableColRow").style.display = "none"
    document.getElementById("orderP1P2").style.display = "none"
    document.getElementById("orderP3").style.display = "none"
    document.getElementById("orderP4").style.display = "none"
    document.getElementById("orderP5").style.display = "none"

}

var randomNow = false
function randomize(){
    randomNow = true
    newSelection()
}

function columnChange(){
    noColumns = parseFloat(document.getElementById("columnVal").value)
    noRows = Math.ceil((poemaOrig.length * poemaOrig[0].length) / noColumns)
    document.getElementById("rowVal").value = noRows
    newSelection()
}

function rowChange(){
    noRows = parseFloat(document.getElementById("rowVal").value)
    noColumns = Math.ceil((poemaOrig.length * poemaOrig[0].length) / noRows)
    document.getElementById("columnVal").value = noColumns
    newSelection()
}

function newSelection(){
    document.getElementById("left").innerHTML = "";
    var modecur = parseFloat(document.getElementById("mode").value)
    if(modecur==1){

        document.getElementById("tableColRow").style.display = "inline"
        document.getElementById("tableColRow").style.visibility = "visible"
        document.getElementById("orderP1P2").style.display = "inline"
        document.getElementById("orderP1P2").style.visibility = "visible"
        document.getElementById("orderP3").style.display = "none"
        document.getElementById("orderP4").style.display = "none"
        document.getElementById("orderP5").style.display = "none"

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


        
        noColumns = parseFloat(document.getElementById("columnVal").value);
        noRows = parseFloat(document.getElementById("rowVal").value);
        noVerses = poemaOrig[0][0].length
        primera(order)

    }else if(modecur==2){

        document.getElementById("tableColRow").style.display = "none"
        document.getElementById("orderP1P2").style.display = "inline"
        document.getElementById("orderP1P2").style.visibility = "visible"
        document.getElementById("orderP3").style.display = "none"
        document.getElementById("orderP4").style.display = "none"
        document.getElementById("orderP5").style.display = "none"

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
        segunda(order)

    }else if(modecur==3){

        document.getElementById("tableColRow").style.display = "none"
        document.getElementById("orderP1P2").style.display = "none"
        document.getElementById("orderP3").style.display = "inline"
        document.getElementById("orderP3").style.visibility = "visible"
        document.getElementById("orderP4").style.display = "none"
        document.getElementById("orderP5").style.display = "none"

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
        tercera(order)

    }else if(modecur==4){

        document.getElementById("tableColRow").style.display = "none"
        document.getElementById("orderP1P2").style.display = "none"
        document.getElementById("orderP3").style.display = "none"
        document.getElementById("orderP4").style.display = "inline"
        document.getElementById("orderP4").style.visibility = "visible"
        document.getElementById("orderP5").style.display = "none"

        //random order cuarta
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
        
        cuarta(order)

    }else if(modecur==5){

        document.getElementById("tableColRow").style.display = "none"
        document.getElementById("orderP1P2").style.display = "none"
        document.getElementById("orderP3").style.display = "none"
        document.getElementById("orderP4").style.display = "none"
        document.getElementById("orderP5").style.display = "inline"
        document.getElementById("orderP5").style.visibility = "visible"

        //random order quinta
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
        
        quinta(order)
    }
}

//PRIMERA----------------------------------------------------------------------------------------------------------------------------------
function primera(order){

    //Rearrange poem
    
    poema = []
    curI = 0
    for (var rowP = 0; rowP < noRows; rowP++) {
        poema.push([])
        for (var verseNo = 0; verseNo < noVerses; verseNo++) {
            poema[rowP].push([])
            curI = rowP%noRows
            for (var columnP = 0; columnP < noColumns; columnP++) {
                if(curI >=  order.length){
                    poema[rowP][verseNo].push(" ")
                }else{
                    poema[rowP][verseNo].push(poemaOrig[order[curI][0]][order[curI][1]][verseNo])
                }
                
                curI += noRows
            }
        }
    }


    // get the reference for the body
    var body = document.getElementById("left")

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    // creating all cells
    for (var rowP = 0; rowP < noRows; rowP++) {
        for (var verseNo = 0; verseNo < poema[rowP].length; verseNo++) {
            // creates a table row
            var row = document.createElement("tr")
            var emptyRow
            if(verseNo == poema[rowP].length-1){
                emptyRow = document.createElement("tr")
            }

            for (var columnP = 0; columnP < poema[rowP][verseNo].length; columnP++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td")
                var cellText = document.createTextNode(poema[rowP][verseNo][columnP])
                cell.appendChild(cellText)
                row.appendChild(cell)
                if(verseNo == poema[rowP].length-1 && poema[rowP][verseNo][columnP] != " "){
                    var cell = document.createElement("td")
                    var cellText = document.createTextNode("____")
                    cell.appendChild(cellText)
                    emptyRow.appendChild(cell)
                }
            }
            // add the row to the end of the table body
            tblBody.appendChild(row)
            if(verseNo == poema[rowP].length-1 && rowP != poema.length-1 && poema[rowP][verseNo][columnP] != " "){
                tblBody.appendChild(emptyRow)
            }
        }
    }
    
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
    // appends <table> into <body>
    body.appendChild(tbl)
}

//SEGUNDA----------------------------------------------------------------------------------------------------------------------------------
function segunda(order){
    //Rearrange poem
    poema = ""
    
    for (var elemPoem = 0; elemPoem < order.length; elemPoem++) {
        for (var verseNo = 0; verseNo < noVerses; verseNo++) {
            poema = poema.concat(poemaOrig[order[elemPoem][0]][order[elemPoem][1]][verseNo], " ")
        }
    }

    // get the reference for the body
    var body = document.getElementById("left")
    var paragraph = document.createElement("p");
    var text = document.createTextNode(poema);

    paragraph.appendChild(text);
    body.appendChild(paragraph)
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

//TERCERA----------------------------------------------------------------------------------------------------------------------------------
function tercera(order){
    //Rearrange poem
    poema = []
    
    for (var rowP = 0; rowP < noRows; rowP++) {
        poema.push([])
        for (var verseNo = 0; verseNo < noVerses; verseNo++) {
            poema[rowP].push([])
            partA = poemaOrig[0][order[0][rowP]][verseNo]
            partB = poemaOrig[1][order[1][rowP]][verseNo]
            poema[rowP][verseNo].push(partA.concat(" ", partB))
        }
    }


    // get the reference for the body
    var body = document.getElementById("left")

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    // creating all cells
    for (var rowP = 0; rowP < noRows; rowP++) {
        for (var verseNo = 0; verseNo < poema[rowP].length; verseNo++) {
            // creates a table row
            var row = document.createElement("tr")

            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td")
            var cellText = document.createTextNode(poema[rowP][verseNo])
            cell.appendChild(cellText)
            row.appendChild(cell)

            // add the row to the end of the table body
            tblBody.appendChild(row)
            if(verseNo == poema[rowP].length-1 && rowP != poema.length-1){
                var emptyRow = document.createElement("tr")
                var cell = document.createElement("td")
                var cellText = document.createTextNode("____")
                cell.appendChild(cellText)
                emptyRow.appendChild(cell)
                tblBody.appendChild(emptyRow)
            }
        }
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

//CUARTA----------------------------------------------------------------------------------------------------------------------------------
function cuarta(order){
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


    // get the reference for the body
    var body = document.getElementById("left")

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    // creating all cells
    for (var rowP = 0; rowP < noRows; rowP++) {
        for (var verseNo = 0; verseNo < poema[rowP].length; verseNo++) {
            // creates a table row
            var row = document.createElement("tr")

            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td")
            var cellText = document.createTextNode(poema[rowP][verseNo])
            cell.appendChild(cellText)
            row.appendChild(cell)

            // add the row to the end of the table body
            tblBody.appendChild(row)
            if(verseNo == poema[rowP].length-1 && rowP != poema.length-1){
                var emptyRow = document.createElement("tr")
                var cell = document.createElement("td")
                var cellText = document.createTextNode("____")
                cell.appendChild(cellText)
                emptyRow.appendChild(cell)
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

//QUINTA----------------------------------------------------------------------------------------------------------------------------------
function quinta(order){
    //Rearrange poem
    poema = []
    
    for (var rowP = 0; rowP < noRows; rowP++) {
        poema.push(poemaOrig[order[rowP][0]][order[rowP][1]][order[rowP][2]])
    }

    // get the reference for the body
    var body = document.getElementById("left")

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table")
    var tblBody = document.createElement("tbody")

    // creating all cells
    for (var rowP = 0; rowP < noRows; rowP++) {
        // creates a table row
        var row = document.createElement("tr")

        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td")
        var cellText = document.createTextNode(poema[rowP])
        cell.appendChild(cellText)
        row.appendChild(cell)

        // add the row to the end of the table body
        tblBody.appendChild(row)
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