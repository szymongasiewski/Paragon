//localStorage.clear()

class Product {
    constructor(name, amount, price, lStorageKey) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.sum = amount * price;
        this.lStorageKey = lStorageKey;
    }
    get Name() {
        return this.name
    }
}

let table = document.getElementById("table"), rIndex;

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

table = document.getElementById("tbody");
let tab = allStorage();

for(let i = 0; i < tab.length; ++i) {
    let rowCount = document.getElementById('tbody').rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = `${rowCount + 1}`;
    cell2.innerHTML = `${JSON.parse(tab[i]).name}`;
    cell3.innerHTML = `${JSON.parse(tab[i]).amount}`;
    cell4.innerHTML = `${JSON.parse(tab[i]).price}`;
    cell5.innerHTML = `${JSON.parse(tab[i]).sum.toFixed(2)}`;
    cell6.innerHTML = `<input class="delete" type="button" value="Usuń" onclick="deleteRow(${rowCount}, ${JSON.parse(tab[i]).lStorageKey})">`;
    editableRow();
}

function onSubmit() {
    let nameIn = document.getElementById("name").value;
    let amountIn = document.getElementById("amount").value;
    let priceIn = document.getElementById("price").value;

    let table = document.getElementById("tbody");
    var rowCount = document.getElementById('tbody').rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    

    let i = 0;
    while(localStorage.getItem(i) !==null) {
        ++i
    }

    let prod = new Product(nameIn, amountIn, priceIn, i);

    cell1.innerHTML = `${rowCount + 1}`;
    cell2.innerHTML = `${prod.Name}`;
    cell3.innerHTML = `${prod.amount}`;
    cell4.innerHTML = `${prod.price}`;
    cell5.innerHTML = `${prod.sum.toFixed(2)}`;
    cell6.innerHTML = `<input class="delete" type="button" value="Usuń" onclick="deleteRow(${rowCount}, ${prod.lStorageKey})">`;
    editableRow();
    localStorage.setItem(i, JSON.stringify(prod));   
    reciptSum();
}

function deleteRow(number, lsKey) {
    document.getElementById("tbody").deleteRow(number);
    localStorage.removeItem(lsKey);
    window.location.reload();
}

function editableRow() {
    for(let i = 0; i < table.rows.length; ++i) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            console.log(rIndex);
    
            document.getElementById("name").value = this.cells[1].innerHTML;
            document.getElementById("amount").value = this.cells[2].innerHTML;
            document.getElementById("price").value = this.cells[3].innerHTML;
        };
    }
}

function editRow() {
    let table = document.getElementById("table");
    let nameIn = document.getElementById("name").value;
    let amountIn = document.getElementById("amount").value;
    let priceIn = document.getElementById("price").value;
 
    table.rows[rIndex].cells[1].innerHTML = nameIn;
    table.rows[rIndex].cells[2].innerHTML = amountIn;
    table.rows[rIndex].cells[3].innerHTML = priceIn;
    table.rows[rIndex].cells[4].innerHTML = (priceIn * amountIn).toFixed(2);

    let key = table.rows[rIndex].cells[5].innerHTML.slice(-4).charAt(0);
    console.log(key);
    let prod = new Product(nameIn, amountIn, priceIn, key);

    localStorage.setItem(key, JSON.stringify(prod));
    reciptSum();
}

function reciptSum() {
    var table = document.getElementById("tbody");
    let sum = 0;
    for (var i = 0; i < table.rows.length; i++) {
        let value = table.rows[i].cells[4].innerHTML;
        value = Number(value);
        sum += value;
    }
    document.getElementById("sum").innerHTML = Number(sum).toFixed(2) + 'zł';
}

reciptSum();
