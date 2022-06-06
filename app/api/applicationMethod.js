var connection = require('../lib/database').connection;

module.exports = {
    register: function (req, res) {
        // accessing the data in request body
        var requestData = req.body;

        var cell_phone =requestData.cell_phone;
        var email =requestData.email;
        var user_id =requestData.user_id;
        var unique_id =requestData.unique_id;

        //validation length
        if(cell_phone.toString().length != 9){
            return res.status(200).json({ status: 0, message: "cell phone not valid" });
        }
                //select id from tb_users where email = 'ors@inmanage.net' or user_id = 203640768 or cell_phone = 547202175 or number_work = 1;

                connection.query('SELECT id FROM tb_users where email=? or user_id=? or cell_phone=? or unique_id=?',[email,user_id,cell_phone,unique_id,], function (err, result, fields) {
                    if (err) {
                         return res.status(500).json({ status: 0, message: "error in database entry creation" });
                    }
                    if (result.length !== 0) {
                        return res.status(200).json({ status: 0, message: "cell phone or user_id or email or unique_id is not possible" });
                    }
                                            connection.query('INSERT INTO tb_users SET ?', requestData, function (err, result, fields) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                                }
                                                connection.query('SELECT * FROM tb_users where cell_phone=? and unique_id=?',[cell_phone,unique_id], function (err, result, fields) {
                                                return res.status(200).json({ status: 1,data:result, message: "userCreatedSuccessfully" });
                                                })
                                            });
                });

    },
    login_user: function (req, res) {
              // accessing the data in request body
              var requestData = req.body;
              var cell_phone =requestData.cell_phone;
              var unique_id =requestData.unique_id;
                //select id from tb_users where number_work = 1 and email = 'ors@gmail.com';

                                connection.query('SELECT * FROM tb_users where cell_phone=? and unique_id=?',[cell_phone,unique_id], function (err, result, fields) {
                                    if (err) {
                                         return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                    }
                                    if (result.length === 0) {
                                        return res.status(200).json({ status: 0, message: "אתה לא רשום" });
                                    }
                                        return res.status(200).json({ status: 1, data :result, message: "התחברת בהצלחה" });
                                });

          },
    terms_of_use: function (req, res) {
                                var requestData = req.body;
                                var unique_id =requestData.unique_id;
                                var job_title =requestData.job_title;
                                var authorized_signatory =requestData.authorized_signatory;

                                if(unique_id==null || job_title==null||authorized_signatory == null ){
                                    return res.status(200).json({ status: 0, message: "חסר מידע" });
                                }
                                connection.query('SELECT first_name,last_name,user_id FROM tb_users WHERE unique_id=?',unique_id, function (err, result, fields) {
                                    if (err) {
                                        return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                    }
                                  if (result.length !== 1) {
                                      return res.status(200).json({ status: 0, message: "לא קיים משתמש במערכת" });
                                  }
                                  data_insert = {...result[0],...{ "job_title" : job_title,"authorized_signatory" : authorized_signatory ,"last_update" : +new Date
    }};
                                  connection.query('INSERT INTO tb_terms_of_use SET ?', data_insert, function (err, result, fields) {
                                      if (err) {
                                          console.log(err);
                                          return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                      }
                                      return res.status(200).json({ status: 1, message: "החתימה בוצעה בהצלחה" });
                                  });
                                });
                            },
               show_terms: function (req, res) {
                                      // accessing the data in request body
                                      var requestData = req.body;

                                      var unique_id =requestData.unique_id;

                            if(unique_id==null ){
                                return res.status(200).json({ status: 0, message: "מידע שגוי" });
                            }
                            connection.query('SELECT id FROM tb_users where unique_id=? AND is_manager=?',[unique_id,1], function (err, result, fields) {
                                    if (err) {
                                         return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                    }
                                    if (result.length === 0) {
                                        return res.status(200).json({ status: 0, message: "אתה לא מנהל" });
                                    }
                  connection.query('SELECT * FROM tb_terms_of_use', function (err, result, fields) {
                                                                             if (err) {
                                                                                  return res.status(500).json({ status: 0, message: "error in database entry creation" });
                                                                             }
                                                                             if (result.length === 0) {
                                                                                 return res.status(200).json({ status: 0, message: "לא נמצאו חתימות" });
                                                                             }
                                                                              return res.status(200).json({ status: 1, message: "נמצאו חתימות" , data: result});
                                                                         });
                                });

                                  },
};