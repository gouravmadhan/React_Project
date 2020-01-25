import axios from 'axios'

export const createTest = () => {
  const date= new Date();
  const key= date.getDate().toString()+0+date.getDay()+date.getUTCFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
  return key;
}


export const addQuestionToDatabase = (ques,answer,key)=>{
  return axios.post('http://localhost:5000/protected/addQuestion',{
    q : ques,
    a : answer,
    k : key
  },{
    headers : {
      'authorization' : localStorage.usertoken
    }
  }).then(res=>{
    return res.data
  }).catch(err=>{
    console.log(err);
  })
} 

export const register = newUser => {
  return axios
    .post('http://localhost:5000/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role : newUser.role
    })
    .then(response => {
      return response.data
    })
}

export const login = user => {
  
  return axios.post('http://localhost:5000/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if(!response.data.error)
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = async () => {
  return await axios
    .get('http://localhost:5000/protected/profile', {
      headers: { 
        'authorization': localStorage.usertoken 
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      if(err.response.status === 403)
      {
        alert('You are not authorised')
        return err.response
      }
    })
}

export const submit = (answers,user,testKey)=>{
   const first_name = user.first_name;
   const last_name = user.last_name;
   const email = user.email;
   const score = user.score;
  return axios.post('http://localhost:5000/protected/submitTest',{
    f : first_name,
    l : last_name,
    e : email,
    s : answers,
    k : testKey,
    score :score
  },{headers: { 
        'authorization': localStorage.usertoken 
      }}).then(res=>{
    console.log(res.data);
    return res.data
  }).catch(err=>{
    if(err.response.status === 403)
      {
        alert('You are not authorised')
        return err.response
      }
  })
} 

export const getResult = (key)=>{
 return axios.post('http://localhost:5000/protected/getResult',{
  'k': key
 },{
  headers : {
    'authorization' : localStorage.usertoken
  }
 })
 .then(res=>{
  console.log(res)
  if(res.error)
  {
    return res.error
  }
  else
  {
    return res.data
  }
 })
 .catch(err=>{
  console.log(err)
 })

}
