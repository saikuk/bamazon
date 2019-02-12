var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "bamazon"
});


connection.connect(function(error) {
    if (error) throw error;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;

        for (var i = 0; i < response.length; i++) {
            console.log("-----------------------------------------------");
            console.log("ID: " + response[i].item_id);
            console.log("Product: " + response[i].product_name);
            console.log("Department: " + response[i].department_name);
            console.log("Price: " + response[i].price);
            console.log("Quantity: " + response[i].stock_quantity);
            console.log("-----------------------------------------------");
        }

        inquirer.prompt([{
            name: "id",
            type: "input",
            message: "ID of the product you would like to buy: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "units",
            type: "input",
            message: "How many units of the product you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }

        }]).then(function(res) {

            for (var i = 0; i < response.length; i++) {
                if (response[i].item_id === parseInt(res.id))
                    stockQuantity(parseInt(res.id), res.units);
            }
        });
    });
}

function stockQuantity(ProductID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: ProductID
    }, function(error, response) {
        if (error) throw error;

        if (response[0].stock_quantity <= 0) {
            console.log("Insufficient quantity!");
            BackToStart();
        } else
            updateQuantity(ProductID, units);
    });
}

function costDisplay(ProductID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: ProductID
    }, function(error, response) {
        if (error) throw error;
        var total = response[0].price * units;
        console.log("Total cost is $ " + total);

        BackToStart();
    });
}

function updateQuantity(ProductID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: ProductID
    }, function(error, response) {
        if (error) throw error;

        var newQuantity = response[0].stock_quantity - units;

        if (newQuantity < 0)
            newQuantity = 0;

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        }, {
            item_id: ProductID
        }], function(error, response) {});

        costDisplay(ProductID, units);
    });
}

function BackToStart() {
    inquirer.prompt([{
        type: "confirm",
        message: "Do you want to buy more items?",
        name: "confirm",
        default: true
    }]).then(function(res) {
        if (res.confirm)
            start();
        else {

            connection.end();
        }
    });
}

