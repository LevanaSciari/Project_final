var mysql      = require('mysql');

// creating a database connection
var connection = mysql.createConnection({
      host     : 'database-app.chpl65l6nh2x.us-east-1.rds.amazonaws.com',
      user     : 'root',
      password : 'Elior1209',
      database : 'app_api'
});
connection.connect();

module.exports = {
    connection : connection
};
