const express = require('express');
const router = express.Router();
const test = require('./models/test.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')
const response = require('./models/response.js');

TeacherValidator = (req,res,next)=>{
	User.findOne({_id:req.user})
	.then(docs=>{
		if(docs.role === 'admin')
		{
			next();
		}
		else
		{
			res.send({'error' : 'You are not a teacher'})
		}
	})
	.catch(err=>{
		res.sendStatus(500);
	})
}

router.post('/getQuestions',(req,res)=>{
    test.findOne({testKey : req.body.key})
    .then(response=>{
      if(response)
      {
        res.send(response.test)       
      }
      else{
        res.send('Not Found')
      }
    })
})

// router.post('/create',TeacherValidator,(req,res)=>{
//   test.findOne({
//     testKey : req.body.testKey
//   })
//   .then(reply=>{
//     if(!reply)
//     {
//       test.create(req.body)
//       .then(response=>
//       {
//         console.log(response)
//       })
//       .catch(err=>{
//         console.log(error);
//       })
//     }
//   })
// })

router.post('/addQuestion',TeacherValidator,(req,res)=>{
  test.findOne({
    testKey : req.body.k
  })
  .then(docs=>{
    if(!docs)
    {
       test.create({
        testKey : req.body.k
       })
       .then(response=>{
          test.updateOne( {testKey:req.body.k},{$push:{test:req.body.q, correctOption:req.body.a}})
          .then(resp=>{
            res.send("Submitted")
          })
          .catch(err=>{
            res.send(err);
          })
       })
    }
    else
    {      
      test.updateOne( {testKey:req.body.k},{$push:{test:req.body.q, correctOption:req.body.a}})
      .then(response=>{
        res.send("Submitted")
      })
      .catch(err=>{
        res.send(err);
      })
    }
  })
})

router.post('/getResult',TeacherValidator,(req, res) => {
  console.log(req.body)
  response.findOne({
    testKey : req.body.k
  })
  .then((docs) => {
      if(docs){
        res.send(docs.responses)
      }
      else
      {
        return([{'error':"No Result Found"}])
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


router.get('/profile', (req, res) => {
  User.findOne({
    _id: req.user
  })
    .then(user => {
      if (user) {
        res.json({
        	first_name : user.first_name,
        	last_name : user.last_name,
        	email : user.email
        })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/submitTest',(req,res)=>{
  var score;
  test.findOne({
    testKey : req.body.k  
  })
  .then(async (reply)=>{
    const marks=reply.correctOption;
    score=0;
    for(var i=0;i<req.body.s.length;i++)
    {
       if(req.body.s[i]===marks[i])score++;
    }
  })

  response.findOne({
    testKey : req.body.k
  })
  .then(record=>{
    if(!record)
    {
      const doc = 
      {
        testKey : req.body.k
      }
      response.create(doc)
      .then(result =>{

        const payload={
          first_name : req.body.f,
          last_name : req.body.l,
          email : req.body.e,
          score : score
        }
        response.updateOne( {testKey:req.body.k},{$push:{responses:payload}})
        .then(reply=>{
          res.send("Submitted");
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err =>console.log(err));
    }
    else
    {
        const payload={
          first_name : req.body.f,
          last_name : req.body.l,
          email : req.body.e,
          score : score
        }
        response.updateOne( {testKey:req.body.k},{$push:{responses:payload}})
        .then(reply=>{
          res.send("Submitted");
        })
        .catch(err=>{
          console.log(err);
        })
    }
  })
  .catch(err=>{
    console.log(err);
  })
})


module.exports = router