import server from './server'


export const state = {
    user: '',
    password: '',
    pooTimes: []
}


export const checkLogin = async function(){
    // if (!pass){
    // if (state.user==='0' && state.password ==='0') return true}
    // if (pass === state.password) return true
    // else false

    const data =  await server.getUser({email:state.user, password: state.password})
    console.log(data)
    if (data.status === "OK") {
        console.log(`${data.data.email} succesfully loged in!!!!!`)
        return true
    }else{
        console.log(data.status)
        return false
    }
    

}

export const createUser = function(userInfo){
    try{
        server.createUser(userInfo)
    }catch(err){
        console.error(err)
    }
    
}

