const express = require('express')

const router = express.Router();

router.get('/', (req, res)=>{
  // req.session.destroy();
  res.render('index',{
    message: "",
  });
})

router.get('/signup', (req, res)=>{
  res.render('signup',{
    message: "",
  });
})

router.get('/home', (req, res)=>{
  res.render('signup',{
    message: "",
  });
})
router.get('/add-event', (req, res)=>{
  res.render('addEvent', {
    message: ""
  });
})

router.post('/logout', (req, res) => {
  // req.session.destroy();
  res.render('login',{
    message: "User logged out."
  });
})

module.exports = router;