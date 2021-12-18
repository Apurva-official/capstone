const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



// mysql 
const db = mysql.createConnection({
  /* here data has been used as it is and not in ".env" because this is a task given for a examine purpose.*/
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task2_nodejs'
})

var ress = [];
exports.signup = (req, res) => {
 
  // console.log(req.body);

  const { name, age, gender, email, password, confirmPassword } = req.body;

  db.query('SELECT email FROM users where email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render('signup', {
        message: 'User with this email already exists'
      })
    }
    else if (password != confirmPassword) {
      return res.render('signup', {
        message: 'Passwords do not match'
      })
    }


    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ? ', { name: name, age: age, gender: gender, email: email, password: hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
      }
      else {
        return res.render('signup', {
          message: 'User Registered'
        })

      }
    });

  });

}



exports.login = (req, res) => {
 
  // console.log(req.body);
  try{
    const { uid, name, age, gender, email, password } = req.body;

 
    function returnHome(){
      db.query('SELECT * FROM events', async (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.length > 0) {
        
          return res.render('home',{
            message: "user logged in",
            email: email,
            res: results, 
          })

          // console.log(results[1])
          // return ress;
        }
        else{
          console.log("Can't fetch events.")
          return res.render('home', {
            message: "Can't fetch events"
          })
        }
      });
    }

  db.query('SELECT * FROM users where email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      
      var salt = bcrypt.genSaltSync(10);

      /** Encrypt password */
      bcrypt.hash(password, salt, (err, res) => {
        // console.log('hash', res)
        hash = res
        compare(hash)
      });

      /** Compare stored password with new encrypted password */
      function compare(encrypted) {
        bcrypt.compare(password, encrypted, (err, res) => {
          // res == true or res == false
          // console.log('Compared result', res, hash)
          if (res) {
            // console.log('matched');

            return results, returnHome();
          }
          else {
            console.log("password invalid");
            return res.render('index', {
              message: 'Passwords is invalid'
            })

          }
        })
      }

    }
    else{
      console.log("User does not exist")
      return res.render('index', {
        message: "User does not exist"
      })
    }
  });

  }
  catch{
    console.log("something went wrong from login side")
  }


  // res.send("form submitted succesfully");
}


// -----------------------------------------------------------------------

exports.addEvent = (req,res) => {

  const { eventid, userid, ename, occurence, startdate, enddate } = req.body;


    db.query('INSERT INTO events SET ? ', { eid: eventid, uid: userid, name: ename, occurence: occurence, startDate: startdate, endDate: enddate }, (error, results) => {
      if (error) {
        console.log(error);
      }
      if(results.length>0){
        return res.render('addEvent', {
          message: 'Event added succesfully.',
        })
      }
      else {
        return res.render('addEvent', {
          message: 'Event added succesfully.'
        })

      }
    });

}
