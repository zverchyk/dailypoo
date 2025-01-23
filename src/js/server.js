import {TIMEOUT_SEC, API_URL} from './config.js'
import {timeout} from './helper.js'

// USER

// create user , poo list and todays session
const createUser = async (userInfo) => {
  try{
  const fetchPro = fetch(`${API_URL}/users/new`, {
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


// logins user and gets/creates session 
const loginUser = async (userInfo) =>{
  try{
  const params = new URLSearchParams(userInfo)
    const fetchPro = await fetch(`http://localhost:3000/users/?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();

    return data.data
  }catch(err){
    throw (err)
  }
  };

// deletes user and poo data
  const deleteUser = async (userId) => {
    try{
  
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
    console.log(data)
    return data.message

  }catch(err){
    throw err
  }



  };

  // logingout 

  const logout = async()=>{
    try{

        const fetchPro = await fetch(`http://localhost:3000/users/logout`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data= await response.json();
    
        return data.data
      }catch(err){
        throw (err)
      }
  }

  // POO

// update session 
  const updateSession= async function(pooInfo){
    try{
      const fetchPro = fetch(`http://localhost:3000/poo/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pooInfo)
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw new Error(`${data.message} ${response.status}`)
        return data.data
        }
        catch(err){
        throw(err)
        }

  }





module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateSession,
    logout


}


