import server from './server'


export const state = {
    mode: undefined,
    user:{
        name: '',
        password: '',
        id:'',
    },
    poo:{
        id:'',
        pooTimes:[]
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
    // if (!pass){
    // if (state.user==='0' && state.password ==='0') return true}
    // if (pass === state.password) return true
    // else false

    const data =  await server.getUser({email:state.user.name, password: state.user.password})
    console.log(data)
    if (data.status === "OK") {
        state.user.id = data.data
        console.log(`${state.user.id}  and ${data.data} succesfully loged in!!!!!`)
        return true
    }else{
        console.log(data.status)
        return false
    }
    
}

export const doesUserExist = async function(){
    const isExist = await server.doesUserExist(state.user.name)
    console.log(isExist)
    return isExist

}

export const createUser = async function(){
    try{
        const data = await server.createUser({email: state.user.name, password: state.user.password})
        return data
        
    }catch(err){
        console.error(err)
    }
    
}

export const deleteUser = async function(){
    const status = await server.deleteUser(state.user.id)
    console.log(status)
    if(status === "OK")return true
    else return false
}
