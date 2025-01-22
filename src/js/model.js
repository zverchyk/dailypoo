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
  };

export const checkLogin = async function(){
    try{
        const data =  await server.getUser({email:state.user.name, password: state.user.password})

        if (data.status === "OK") {
            state.user.id = data.data
            return true
        }else{
            console.log(data.status)
            return false
        }
    }catch(err){
        throw err
    }

    
}

export const doesUserExist = async function(){
    try{
        const isExist = await server.doesUserExist(state.user.name)
        return isExist
    }catch(err){
        throw err
    }


}

// creates user and poo session
export const createUser = async function(){
    try{
        
        const response = await server.createUser({email: state.user.name, password: state.user.password})
        state.user.id = response.data.userId
        return response.data.message
        
    }catch(err){
        throw(err)
    }
    
}

export const deleteUser = async function(){
    try{

        const response = await server.deleteUser(state.user.id)
        return response
    }catch(err){
        throw err
    }

}

// poo
export const createPooList = async function(){
    try{
        const response = await server.createPooList(state.user.id)
        return response
    }catch(err){
        throw err
    }


}
export const updateSession = async function(){
    try{
        const response = await server.updateSession(state.user.id, state.poo)
        return response // response.message 
    }catch(err){
        throw err
    }
}

export const getSession = async function(){
    try{
        
        const response = await server.getSession(state.user.id, state.poo.day)
        return response //response.times
    }catch(err){
        throw err
    }
}

export const createSession = async function(){
    try{
        const response = await server.createSession(state.user.id, state.poo.day)
        return response
    }catch(err){
        throw err
    }
}

export const loadOrCreateSession = async function () {
    try {
        return await getSession();
    } catch (err) {
        console.log('Session not found. Creating a new session...');
        await createSession();
        return []; // Return an empty array if a new session is created
    }
};


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