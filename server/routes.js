const express = require('express');
const router = express.Router();
const test = require('./models/test.js')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')
const response = require('./models/response.js');
router.use(cors())

process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role : req.body.role,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } 
      else {
        res.json({ error : 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(async (user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //Passwords match
          const payload = {
            _id: user._id,
             first_name: user.first_name,
             last_name: user.last_name,
             email: user.email,
            // role : user.role
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



module.exports = router;