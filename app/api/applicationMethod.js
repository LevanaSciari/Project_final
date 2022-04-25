var connection = require('../lib/database').connection;

module.exports = {
    register: function (req, res) {
        // accessing the data in request body
        var requestData = req.body;
        res.status(200).json({ test: requestData.test1, test1: "levanaaaa" });
        // if task message is not available then returning error
//        if (!requestData.taskMessage) {
//            return res.status(400).json({ code: "taskCreationFailed", message: "task message not available" });
//        }

//        var taskData = {
//            taskMessage: requestData.taskMessage,
//            createdAt: new Date(),
//            updatedAt: new Date()
//        };
        //inserting data into mysql
//        connection.query('INSERT INTO task SET ?', taskData, function (err, result, fields) {
//            if (err) {
//                console.log(err);
//                return res.status(500).json({ code: "taskCreationFailed", message: "error in database entry creation" });
//            }
//            return res.status(200).json({ code: "taskCreated", message: "taskCreatedSuccessfully" });
//        });
    },
};