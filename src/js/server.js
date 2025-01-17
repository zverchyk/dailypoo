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
    console.log(data)
    return data.data.userId
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
    const response = await fetch(`http://localhost:3000/users/?id=${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
    console.log(data);
    return data.status

  };
  const doesUserExist = async function(userName){
    try{   
      console.log(userName)
    const responce = await fetch((`http://localhost:3000/users/exist/?username=${userName}`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await responce.json();
    // returns true if exist and false if not
    console.log(data)
    if(data.status==="OK") return data.exist

  }catch(err){
    console.error(err)
  }
  }

  // poo count
  const createPooSession = async function(userId){
    try{
      const fetchPro = fetch(`http://localhost:3000/poo/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
        return data.message || 'poo list created'
      }
      catch(err){
        throw(err)
        }
  }
  const addPoo = async function(userId, pooInfo){
    // try{
    //   const fetchPro = fetch(`http://localhost:3000/poo?userid=${userId}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(pooInfo)
    //   });
    //   const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    //   const data= await response.json();
    //   if (!response.ok)throw new Error(`${data.message} ${response.status}`)
    //     return data
    //     }
    //     catch(err){
    //     throw(err)
    //     }
    const val = await new Promise(resolve => resolve(`${pooInfo} added`))
    return val
  }

  const getPooList = async function(userId){
    return [2,2,2]
  }


module.exports = {
    createUser,
    getUser,
    deleteUser,
    doesUserExist,
    createPooSession,
    addPoo, 
    getPooList
}


