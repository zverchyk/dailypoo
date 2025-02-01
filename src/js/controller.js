import * as model from "./model";


import mainView from "./view/mainView";
import headerView from "./view/headerView";
import loginView from "./view/loginView";
import accountView from "./view/accountView";
import deleteAccountView from "./view/deleteAccountView";
import toastView from "./view/toastView";
import chartView from "./view/chartView";

import editAccountView from "./view/editAccountView";
import userBlockView from "./view/userBlockView";





const controlClock = function(){
    setInterval(mainView.updateClock.bind(mainView), 1000)
    mainView.updateClock()
}


// const controlPooHeader =async function(){
//     if(!model.state.user.id) return 
    
//     }

const controlPooButton = async function(){
        createAdvice()
        console.log(mainView.currentSize)
    if(!model.state.user.id) {
        toastView.notify("log in or sing in to poo)")
        // loginView.scrollToBottom()
        return
     }
        const now = new Date();

    try{
        
        // SIZE ---------- POO
  
        // Get current time in HH:MM:SS format and date in DD:MM:YY format
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        let iconSize
        if(mainView.currentSize <150){
            iconSize = "1rem"
        }
        if(mainView.currentSize <250 && mainView.currentSize >=150){
            iconSize = "2rem"
        }
        if(mainView.currentSize >=250){
            iconSize = "3rem"
        }
        model.state.poo.times.push(time)
        model.state.poo.sizes.push(iconSize)

        headerView.time = time
        headerView.size =iconSize

        const pooResposnse = await model.updateSession()
        headerView.renderPoo()
        toastView.notify(pooResposnse)
        
    }
    catch(err){
        toastView.notify(err)
        console.error(err)
    }
}

// ENTERING ACCOUNT 
const controlLogin = function(){
    try{
        loginView.render()

        model.state.mode = 'log-in'
    }
    catch(err){
        console.error(`my error:  ${err}`)
    }
}

const controlSignUp = function(){
    try{
        loginView.render()

        model.state.mode = 'sign-in'
  
    }
    catch(err){
        toastView.notify(err)

    }
}
const controlEntryAccount = async function(){
    model.createToday()
    if (model.state.mode === 'sign-in') await createAccount()
    if (model.state.mode === 'log-in') await loginAccount()

}

// subfunctions 
const createAccount = async function(){
    const [ user, pass]  = loginView.getUserPass()
 
    try{
        if (!user || !pass) {
            throw 'Please enter your email and password'
          
        }
       if ( !model.validateEmail(user)){
            throw 'Please enter a valid email'
       }
       
        model.state.user.name = user;
        model.state.user.password = pass;
        accountView.renderSpinner()

        // creates user
        const response = await model.createUser()
        // creates account window
        controlAccountWindow()

        toastView.notify(response)

           
    }catch(err){
        toastView.notify(err)
        loginView.render()

  
    }
}

const loginAccount = async function () {
    
        const [user, pass] = loginView.getUserPass();

    try {
        if (!user || !pass) {
            throw 'Please enter your email and password'
          
        }
       if ( !model.validateEmail(user)){
            throw 'Please enter a valid email'
       }
    
        model.state.user.name = user;
        model.state.user.password = pass;
        accountView.renderSpinner()
      
        const response = await model.loginUser()
        toastView.notify(response);
        userBlockView.currentIcon= model.state.user.icon
        controlIcon()
        controlAccountWindow()
        
        // Render sessions from the database
        
        model.state.poo.times.forEach((time) =>{
            headerView.time = time
            headerView.size = model.state.poo.sizes[model.state.poo.times.indexOf(time)]
             headerView.renderPoo()});
    } catch (err) {
        toastView.notify(err);
        loginView.render()

    }
};
// ENTERING ACCOUNT

// ADVICES
const createAdvice = async function(){
    try{
        
        accountView.advice =  await model.getAdvice()
        accountView.changeAdvice()
        
        
    }catch(err){
        toastView.notify('a good advice did not come to you today')
    }
    
}

// EDIT USER

const controlEditAccountWindow =function(){

    editAccountView.email = model.state.user.name
    editAccountView.password = model.state.user.password
    editAccountView.init()
    editAccountView.render()
    editAccountView.addCancelHandler(controlAccountWindow)
    editAccountView.addSaveHandler(saveEditedUser)
}

const saveEditedUser = async function(){
    // conect with server 

    const [newEmail, newPassword]= editAccountView.getUserInput()
    model.state.updatedUser.newEmail = newEmail
    model.state.updatedUser.newPassword = newPassword
    try{
        const response = await model.updateUser()
        toastView.notify(response)
        controlAccountWindow()

    }catch(err){
        console.error(err)
        toastView.notify(err)
    }


    
}

const controlAccountWindow = function(){

    accountView.render();
    userBlockView.init()
    console.log(model.state.user.name)
    userBlockView.username = model.state.user.name
    userBlockView.render()
    userBlockView.addIconHandler(controlIcon)
    userBlockView.addEditHandler(controlEditAccountWindow)

// 


}
//  EDIT USER

const controlEntryWindow =function(){
    try{
        loginView.render(loginView._generateLogInMarkUp())
    }catch(err){
        toastView.notify(err)
    }
}



const controlLogOut = async function(){
    try{


        await model.updateUser()
       const response =await model.logout()
       model.resetState()
       loginView.render(loginView._generateLogInMarkUp())
       toastView.notify(response)
       headerView.clearPoo()
    
       location.reload();

    }catch(err){
        console.error(err)
        toastView.notify(err)
    }
}



// DELETING USER AND POO DATA
const controlDeleteAccount = async function(){
    const pass = deleteAccountView.getConfirmedPass()
    if(model.state.user.password !== pass){
        toastView.notify('wrong password')
        return 
    }
    try{
        const deleteConfirm = await model.deleteUser()
        headerView.clearPoo()
        loginView.render(loginView._generateLogInMarkUp())
        toastView.notify(deleteConfirm)
    }catch(err){
        toastView.notify(err)
    }
    

}
const controlDeleteAccountWindow =function(){
    try{
        deleteAccountView.render()
    }catch(err){
        console.error(err)
    }
}
// GRAPHS
// opens 
const controlGraph = async function(){
    try{
        if (!model.state.sessionUpdated) {
            chartView.openChart()
            
            return 
        } 
        toastView.notify('data is loading...')
        const config = await model.createGraph()
        chartView.updateChart(config)
        chartView.openChart()
        toastView.notify('data is loaded')
        model.state.sessionUpdated= false

    }catch(err) {
        console.log(err)
        toastView.notify(err)
    }

}

const controlSendingChart = async function(){
    try{
        const response = await model.sendChart()
        toastView.notify(response)
    }catch(err){
        console.error(err)
        toastView.notify(err)
    }   
}

const controlDownloadingChart =  function(){
    try{
        const response =  model.downloadChart()
        toastView.notify(response)
    }catch(err){
        toastView.notify(err)
    }
}

const controlCloseChart = function(){
    chartView.closeChart()

}

// ICONS
const controlIcon = function(){
    if(userBlockView.currentIcon!==""){
        model.state.user.icon = userBlockView.currentIcon
    }
    mainView.changePooIcon(model.state.user.icon)
    headerView.changePooIcon(model.state.user.icon)
}




// delete one icon 
const cotrolDeleteOneIcon = async function(){

    try{
    // delete one poo from the list 
    const index = model.state.poo.times.indexOf(headerView.time);
    if (index !== -1) {
        model.state.poo.times.splice(index, 1);
        }

    toastView.notify('deleted')
    // update the list
    const pooResposnse = await model.updateSession()

    toastView.notify(pooResposnse)
    // delete the poo from the page
    headerView.deleteOnePoo()

    }catch(err){
        toastView.notify(err)
    }

    
}





const init = function(){

    model.createToday()
    controlClock()
    mainView.addStopGrowingPoo()
    mainView.addGrowingHandler()
    mainView.addHandlerRender(controlPooButton)
    loginView.addCancelHandler(controlEntryWindow)
    loginView.addEventHandler(controlLogin)
    loginView.addLoginHandler(controlEntryAccount)
    loginView.addSignUpHandler(controlSignUp)
    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    accountView.addGraphHandler(controlGraph)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)
    deleteAccountView.addCancelDeleteHandler(controlAccountWindow)
    chartView.addCloseChartHandler(controlCloseChart)
    chartView.addDownloadChartHandler(controlDownloadingChart)
    chartView.addSendChartHandler(controlSendingChart)
    headerView.addDeleteOneHandler(cotrolDeleteOneIcon)


}

init()