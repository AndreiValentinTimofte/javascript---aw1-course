import sqlite from "sqlite3";

const db = new sqlite.Database("questions.sqlite", (err) => {
if (err)  throw err;
});

let sql = "SELECT * FROM answer"
// let result = []

// callback: è asincrono. Passa alla successiva operazione. Tutte le operazioni di un callback asincrona che hanno  
// delle dipendenza al di fuori può rompere l'integrità del codice
db.all(sql, (err,rows) => {
    if (err) throw err;
    for (let row of rows)
        console.log(row);
        // result.push(row);
});

// In questo caso result è vuoto, perché la callback è asincrona
// for (let r of result) {
//     console.log(r);
// }


