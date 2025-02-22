import {TIMEOUT_SEC} from './config.js'
import {timeout} from './helper.js'

import * as wsModel from './wsModel.js'

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


// USER and SESSIONS 

// create user , poo list and todays session
const createUser = async (userInfo) => {

  try{
  const fetchPro = await fetch(`${process.env.API_URL}/users/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo)
  });
  const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
  const data= await response.json();

  if (!response.ok)throw  data.error

  return data.data
    }
    catch(err){
    throw(err)

    }
};

// update user info
const updateUser = async (userInfo) =>{
  // return {...userInfo, message: 'all good'}
  try{
    const fetchPro = await fetch(`${process.env.API_URL}/users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();
  
    if (!response.ok)throw  data.error
  
    return data.data
      }
      catch(err){
      throw(err)
  
      }
}

// logins user and gets/creates session 
const loginUser = async (userInfo) =>{
  try{
   
  const params = new URLSearchParams(userInfo)
    const fetchPro = await fetch(`${process.env.API_URL}/users/?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();

    if (!response.ok)throw  data.error
    return data.data


  }catch(err){
    throw (err)
  }
  };

// deletes user and poo data
  const deleteUser = async (userId) => {
    try{
  
    const fetchPro = await fetch(`${process.env.API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();
    if (!response.ok)throw data.error

    return data.data.message

  }catch(err){
    throw err
  }
  };

// logingout 
const logout = async()=>{
    try{

        const fetchPro = await fetch(`${process.env.API_URL}/users/logout`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data= await response.json();
    
      if (!response.ok)throw {error: data.error}
      return data.data

      }catch(err){
        throw err.error
      }
  }



// POO

// update session 
  const updateSession= async function(pooInfo){

    try{
      const fetchPro = fetch(`${process.env.API_URL}/poo/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pooInfo)
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw  data.error
        return data.data
        }
        catch(err){
        throw err
        }

  }
  // get all sessions 
  const getSessions = async function(userId){
    try{
      const fetchPro = fetch(`${process.env.API_URL}/poo/all/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])

      const data= await response.json();
      if (!response.ok)throw  data.error
      return data.data
  
  }catch(err){
    throw err
  }}


// recieve data form iot device by sse tech

const connectUser = async function(userId){
  const eventSource = new EventSource(`${process.env.API_URL}/poo/events/${userId}`);
  eventSource.onmessage = (event) => {

    const data = JSON.parse(event.data)
    wsModel.notifyListener(data)
    // console.log("Received:", data);
    
  };

  eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
  };
}

const onMessage = function(callback){
    wsModel.setListener(callback)
}
  


// ADVICE

// get advice 
const getAdvice = async function(){
  try{
    const fetchPro = await fetch(process.env.API_ADVICE, {
      method: 'GET',
      headers: { 'Content-Type':'application/x-www-form-urlencoded'}
   })

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
 
    const data = await response.json()


    if (!response.ok)throw 'something went wrong'

    return data.slip.advice
  }catch(err){

    throw err
  }
  
}

// GRAPH and EMAIL

// send graph
const sendChart = async function(email, imageData){

  try{
    const fetchPro = await fetch(`${process.env.API_URL}/email/chart`, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        "email": email,
        "imageData": `${imageData}`
      })
    });


    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();
    if (!response.ok)throw  data.data.error
    return data.data.message
  }catch(err){
    throw err
  }
}



module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    updateSession,
    logout,
    getAdvice,
    getSessions,
    sendChart,
    connectUser,
    onMessage



}


