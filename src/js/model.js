import server from './server'
import validator from 'validator'
import {createBubbleChart} from './graph'



export const state = {
    mode: undefined,
    sessionUpdated:true,
    user:{
        email: '',
        password: '',
        id:'',
        icon: '',
        pic: ''
    },
    poo:{
        day:'',
        times:[],
        sizes:[]
    },
    updatedUser:{
        newEmail:'',
        newPassword: '',
        newPic: '',
        newIcon:''
    }

}

export const validateEmail = function(email){
    return validator.isEmail(email)? true: false
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
        
        const response = await server.createUser({email: state.user.email, password: state.user.password, day: state.poo.day})
        state.user.id = response.userId
        return response.message
        
    }catch(err){
        throw(err)
    }
    
}

export const updateUser = async function(){
    try{
        const userInfo = {
            email: state.updatedUser.newEmail, 
            password:state.updatedUser.newPassword,
            icon: state.updatedUser.newIcon
        }
        const removeKeys = (obj, keysToRemove) => Object.fromEntries(
            Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
        );
        
   
        let keysToRemove = []
 
        // filters for duplicates and empty values
        Object.keys(userInfo).forEach(item=>{
            if (userInfo[item] === "") keysToRemove.push(item)

            if (userInfo[item] === state.user[item]) keysToRemove.push(item)
         })

        const checkedUserInfo = removeKeys(userInfo, keysToRemove);


        if (Object.keys(checkedUserInfo).length === 0) throw 'nothing to update'

        const response = await server.updateUser({...checkedUserInfo, userId: state.user.id})

        // if success update state.user.email and etc
        Object.keys(checkedUserInfo).forEach(item=>{
            state.user[item] = checkedUserInfo[item]
        })

        // clear state.updatedUser.newEmail and etc
        Object.keys(state.updatedUser).forEach(item=>{
           state.updatedUser[item] = ''
        })

         return response.message
    }catch(err){
        throw err
    }
}
// logins user and gets session

export const loginUser = async function(){

    try {
        const response = await server.loginUser({ email: state.user.email, password: state.user.password, day: state.poo.day});
        state.user.id = response.userId
        state.user.icon = response.icon
   
        

        if (!response.session) {
            state.poo.times = []
            state.poo.sizes = []
            return response.message
        } 
        state.poo.times = response.session.times
        state.poo.sizes = response.session.times
        return response.message
        
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
        const sessionInfo = {
            userId: state.user.id, 
            day: state.poo.day,
            times: state.poo.times,
            sizes: state.poo.sizes
        }
        const response = await server.updateSession(sessionInfo)
        state.sessionUpdated =true
        return response 
        
    }catch(err){
        throw err
    }
}

// create graph
export const createGraph = async function(){
    try{
        const rawData = await server.getSessions(state.user.id)
        console.log(rawData[0].times.length)
        if (rawData[0].times.length === 0) throw ('no data to create a chart')
        const config = createBubbleChart(rawData)

        return config
    }catch(err){
        throw err
    }
}


export const downloadChart= function() {
    const canvas = document.getElementById("bubbleChartCanvas");
    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "month_poo_chart.png";
    link.click();
    return 'ready to download'
}


export const sendChart = async function(){
    try{
        const email = state.user.email
        const canvas = document.getElementById('bubbleChartCanvas');
        const imageData = canvas.toDataURL('image/png'); // Convert to Base64
        const response = await server.sendChart(email, imageData)
        return response
    }catch(err){
        throw err
    }
}
// ADVICE 

export const getAdvice = async function(){
    const advice = await server.getAdvice()
    return advice

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




