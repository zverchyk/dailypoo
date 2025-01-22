import {TIMEOUT_SEC} from './config.js'
import {timeout} from './helper.js'

// user 

const createUser = async (userInfo) => {
  try{
  const fetchPro = fetch(`http://localhost:3000/users/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo)
  });
  const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
  const data= await response.json();
  if (!response.ok)throw new Error(`${data.message} ${response.status}`)
    return data
    }
    catch(err){
    throw(err)
    }
};

const getUser = async (userInfo) => {
  

    const params = new URLSearchParams(userInfo)
    const response = await fetch(`http://localhost:3000/users?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();

    return data
  };

  const deleteUser = async (userId) => {
    console.log('delte user')
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
    console.log(data)
    return data.status

  };
  const doesUserExist = async function(userName){
    try{   
    const responce = await fetch((`http://localhost:3000/users/exist/?username=${userName}`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await responce.json();
    // returns true if exist and false if not
    if(data.status==="OK") return data.exist

  }catch(err){
    console.error(err)
    throw(err)
  }
  }



  // poo 
  const createPooList = async function(userId){
    try{
      const fetchPro = fetch(`http://localhost:3000/poo/newlist/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
        return data.data.message || 'poo list created'
      }
      catch(err){
        throw(err)
        }
  } 

  const createSession = async function(userId, day){
    try{
        const fetchPro = fetch(`http://localhost:3000/poo/${userId}?day=${day}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
        return data.data || 'session created'
      }
      catch(err){
        throw(err)
        }
  } 
  
  const updateSession= async function(userId, pooInfo){
    try{
      const fetchPro = fetch(`http://localhost:3000/poo/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pooInfo)
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
        return data.data.message
        }
        catch(err){
        throw(err)
        }

  }

  const getSession = async function(userId, day){
    try{
      const fetchPro = fetch(`http://localhost:3000/poo/${userId}?day=${day}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
      return data.data.times
      }
      catch(err){
        throw (err)
        }
  }




module.exports = {
    createUser,
    getUser,
    deleteUser,
    doesUserExist,
    createPooList,
    getSession,
    updateSession,
    createSession
}


