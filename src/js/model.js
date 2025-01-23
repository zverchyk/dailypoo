import server from './server'


export const state = {
    mode: undefined,
    user:{
        name: '',
        password: '',
        id:'',
    },
    poo:{
        day:'',
        times:[]
    }

}

export const resetState = () => {
    for (const key in state) {
      if (typeof state[key] === 'object' && !Array.isArray(state[key])) {
        for (const subKey in state[key]) {
          state[key][subKey] = Array.isArray(state[key][subKey]) ? [] : '';
        }
      } else {
        state[key] = undefined;
      }
    }
    console.log(state)
  };


// creates user and poo session
export const createUser = async function(){
    try{
        
        const response = await server.createUser({email: state.user.name, password: state.user.password, day: state.poo.day})
        state.user.id = response.userId
        return response.message
        
    }catch(err){
        throw(err)
    }
    
}

// logins user and gets session

export const loginUser = async function(){

    try {
        const response = await server.loginUser({ email: state.user.name, password: state.user.password, day: state.poo.day});

        state.user.id = response.userId
        if (typeof(response.session) === String()) {
            return response.session    
        } 
 
        state.poo.times = response.session
        return 'data retrived'
        
    } catch (err) {
        throw err;
    }
}
// deletes user and poo data 
export const deleteUser = async function(){
    try{

        const response = await server.deleteUser(state.user.id)
        return response
    }catch(err){
        throw err
    }

}

export const logout = async function(){
    try{
        const response = await server.logout()
        return response
    }catch(err){
        throw err
    }
}


// POO

// updates session 
export const updateSession = async function(){
    try{
        const response = await server.updateSession({userId: state.user.id, day: state.poo.day, times: state.poo.times})
        return response 
    }catch(err){
        throw err
    }
}

// creates todays
export const createToday = function(){
    const now = new Date();

            // Get current time in HH:MM:SS format and date in DD:MM:YY format

            const day = String(now.getDate()).padStart(2, '0'); // Ensures two digits
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
            const year = now.getFullYear();

            // Combine them into the desired format
            const date = `${day}${month}${year}`;

            state.poo.day = date
            
}