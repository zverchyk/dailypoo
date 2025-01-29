import * as model from "./model";


import mainView from "./view/mainView";
import headerView from "./view/headerView";
import loginView from "./view/loginView";
import accountView from "./view/accountView";
import deleteAccountView from "./view/deleteAccountView";
import toastView from "./view/toastView";
import chartView from "./view/chartView";



const controlClock = function(){
    setInterval(mainView.updateClock.bind(mainView), 1000)
    mainView.updateClock()
}


// const controlPooHeader =async function(){
//     if(!model.state.user.id) return 
    
//     }

const controlPooButton = async function(){
        createAdvice()
    if(!model.state.user.id) {
        toastView.notify("log in or sing in to poo)")
        loginView.scrollToBottom()
        return
     }
        const now = new Date();

    try{

        // Get current time in HH:MM:SS format and date in DD:MM:YY format
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        model.state.poo.times.push(time)

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
        toastView.notify(`my error:  ${err}`)
        console.error(`my error:  ${err}`)
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

        controlAccountWindow()
        // Render sessions from the database
        model.state.poo.times.forEach(() => headerView.renderPoo());
    } catch (err) {
        console.log(err)
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

const controlAccountWindow = function(){
    accountView.username = model.state.user.name

    accountView.render();


}


const controlEntryWindow =function(){
    try{
        loginView.render(loginView._generateLogInMarkUp())
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


const controlLogOut = async function(){
    try{
       const response =await model.logout()
       model.resetState()
       loginView.render(loginView._generateLogInMarkUp())
       toastView.notify(response)
       headerView.clearPoo()

    }catch(err){
        console.error(err)
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

// GRAPHS

const controlGraph = async function(){
    try{
        toastView.notify('data is loading...')
        const config = await model.createGraph()
        chartView.renderChart(config)
        toastView.notify('data is loaded')

    }catch(err) {
        console.log(err)
        toastView.notify('error is here')
    }

}

const controlSendingChart = async function(){
    try{
        
        toastView.notify('coming soon...')
    }catch(err){
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

// ICONS
const controlIcon = function(){
    mainView.changePooIcon(accountView.currentIcon)
    headerView.changePooIcon(accountView.currentIcon)
}

// EDIT USER
const controlEditUser = function(){
    toastView.notify('Coming soon....')
}





const init = function(){
    model.createToday()
    controlClock()
    mainView.addHandlerRender(controlPooButton)
    loginView.addCancelHandler(controlEntryWindow)
    loginView.addEventHandler(controlLogin)
    loginView.addLoginHandler(controlEntryAccount)
    loginView.addSignUpHandler(controlSignUp)
    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    accountView.addGraphHandler(controlGraph)
    accountView.addIconHandler(controlIcon)
    accountView.addEditHandler(controlEditUser)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)
    deleteAccountView.addCancelDeleteHandler(controlAccountWindow)
    chartView.addCloseChartHandler()
    chartView.addDownloadChartHandler(controlDownloadingChart)
    chartView.addSendChartHandler(controlSendingChart)


}

init()