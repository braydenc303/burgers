var connection = require("./connection");

//The following function comes from the cats activity. It is a helper function to to create the ? portion of the query. If we need to pass 3 values into the mySQL query. we need to 3 question marks. This function loops through and creates an array of question marks and turns it into a string. ["?","?","?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };
    return arr.toString();
};

//The following function also comes from the solution to the cats app. It is a helper function to convert object key/value pairs to SQL syntax.
function objToSql(ob) {
    var arr = [];

    //loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if the string contains spaces, add quotations (Buffalo Blue Cheese Burger => 'Buffalo Blue Cheese Burger')
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            //e.g. {burger_name: 'Buffalo Blue Cheese Burger'} => ["name='Buffalo Blue Cheese Burger'"];
            //e.g. {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        };
    };
    //translate array of strings to a single comma-separated string
    return arr.toString();
};

//Object for all SQL statement functions.
var orm = {
    //This function will be used to query the database to display all of the burgers.
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM" + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
    //This function will be used to add a new burger to the database
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO" + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if(err) throw err;
            cb(result);
        });
    },
    //This function will be used to change the boolean value of devoured to true. An example of objColVals would be {devoured: true}
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE" + table;
        // e.g. "UPDATE burgers SET devoured = true WHERE id = '1'"
        queryString += "SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;