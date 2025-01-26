import {TIMEOUT_SEC, API_URL, API_ADVICE} from './config.js'
import {timeout} from './helper.js'

// USER

// create user , poo list and todays session
const createUser = async (userInfo) => {

  try{
  const fetchPro = await fetch(`${API_URL}/users/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo)
  });
  const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
  const data= await response.json();
  if (!response.ok)throw {error: data.error}

  return data.data
    }
    catch(err){

    throw(err.error)

    }
};


// logins user and gets/creates session 
const loginUser = async (userInfo) =>{
  try{
  const params = new URLSearchParams(userInfo)
    const fetchPro = await fetch(`${API_URL}/users/?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();

    if (!response.ok)throw {error: data.error}
    return data.data


  }catch(err){
    console.log(err.error)
    throw (err.error)
  }
  };

// deletes user and poo data
  const deleteUser = async (userId) => {
    try{
  
    const fetchPro = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data= await response.json();
    console.log(response)
    console.log(data)
    if (!response.ok)throw {error: data.error}

    return data.data.message

  }catch(err){
    throw err.error
  }
  };

  // logingout 

  const logout = async()=>{
    try{

        const fetchPro = await fetch(`${API_URL}/users/logout`, {
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
      const fetchPro = fetch(`${API_URL}/poo/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pooInfo)
      });
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
      const data= await response.json();
      if (!response.ok)throw {error: data.error}
        return data.data
        }
        catch(err){
        throw err.error
        }

  }
  


  // ADVICE

// get advice 
const getAdvice = async function(){
  try{
    const fetchPro = fetch(API_ADVICE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        mode: 'no-cors' 
       }
    })
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])

    const data = await response.json()

    if (!response.ok)throw {error: 'something went wrong'}
    console.log(data)
    return data.slip.advice
  }catch(err){
    throw err.error
  }
  
}




module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateSession,
    logout,
    getAdvice


}


