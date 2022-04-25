var connection = require('../lib/database').connection;

module.exports = {
    register: function (req, res) {
        // accessing the data in request body
        var requestData = req.body;

        var cell_phone =requestData.cell_phone;
        var email =requestData.email;
        var user_id =requestData.user_id;
        var number_work =requestData.number_work;
        //validation length
        if(cell_phone.toString().length != 9){
            return res.status(200).json({ status: 0, message: "cell phone not valid" });
        }
                //select id from tb_users where email = 'ors@inmanage.net' or user_id = 203640768 or cell_phone = 547202175 or number_work = 1;

                connection.query('SELECT id FROM tb_users where email=? or user_id=? or cell_phone=? or number_work=?',[email,user_id,cell_phone,number_work], function (err, result, fields) {
                    if (err) {
                         return res.status(500).json({ status: 0, message: "error in database entry creation" });
                    }
                    if (result.length !== 0) {
                        return res.status(200).json({ status: 0, message: "cell phone or user_id or email or number_work is not possible" });
                    }
                                            connection.query('INSERT INTO tb_users SET ?', requestData, function (err, result, fields) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                                }
                                                return res.status(200).json({ status: 1, message: "userCreatedSuccessfully" });
                                            });
                });

    },
    login_user: function (req, res) {
              // accessing the data in request body
              var requestData = req.body;
              var email =requestData.email;
              var number_work =requestData.number_work;
                //select id from tb_users where number_work = 1 and email = 'ors@gmail.com';

                                connection.query('SELECT id FROM tb_users where email=? and number_work=?',[email,number_work], function (err, result, fields) {
                                    if (err) {
                                         return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                    }
                                    if (result.length === 0) {
                                        return res.status(200).json({ status: 0, message: "אתה לא רשום" });
                                    }
                                     return res.status(200).json({ status: 1, message: "התחברת בהצלחה" });
                                });

          },
};