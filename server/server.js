const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.static("public"));
const port = 3000;
const jsonParser = bodyParser.json();
let mysql2 = require("mysql2");
const options = {
    host: "localhost",
    user: "root",
    password: "Wordpass666!",
    database: "shoplist",
};

app.get("/get-needs", (req, res) => {
    let connector = mysql2.createConnection(options);

    connector.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connector.query("SELECT * FROM needs;", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
});

app.post("/add-need", jsonParser, (req, res) => {
    let newData = req.body;
    let newArr = [newData.item];

    let connector = mysql2.createConnection(options);

    connector.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connector.query(
            "INSERT INTO needs(item) VALUES (?)",
            newArr,
            function (err, result) {
                if (err) throw err;
                // console.log("Result: " + result);
                // console.log(JSON.stringify(result[0].Make));
            }
        );
    });
    res.send("anything");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
