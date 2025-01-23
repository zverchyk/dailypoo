import * as model from "./model";



import mainView from "./view/mainView";
import headerView from "./view/headerView";
import loginView from "./view/loginView";
import accountView from "./view/accountView";
import deleteAccountView from "./view/deleteAccountView";
import toastView from "./view/toastView";



const controlClock = function(){
    setInterval(mainView.updateClock.bind(mainView), 1000)
    mainView.updateClock()
}


// const controlPooHeader =async function(){
//     if(!model.state.user.id) return 
    
//     }

const controlPooButton = async function(){
    if(!model.state.user.id) {
        toastView.notify("log in to poo)")
        return }
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
        loginView.scrollToLoginElement()
        model.state.mode = 'log-in'
        

     
    }
    catch(err){
        console.error(`my error:  ${err}`)
    }
}

const controlSignIn = function(){
    try{
        loginView.render()
        loginView.scrollToLoginElement()
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

    try{
        const [ user, pass]  = loginView.getUserPass()
        model.state.user.name = user
        model.state.user.password = pass

        await model.createUser()
        accountView.render()
        accountView.scrollToLoginElement()
        toastView.notify(`Account succesfully created`)
        

        
    }catch(err){
        toastView.notify(err)
        console.error(`my error:  ${err}`)
    }
}

const loginAccount = async function () {
    // Ensure user credentials are available
    if (!model.state.user.name || !model.state.user.password) {
        const [user, pass] = loginView.getUserPass();
        model.state.user.name = user;
        model.state.user.password = pass;
    }
    try {
        const response = await model.loginUser()
        toastView.notify(response)

        toastView.notify('You have successfully logged in');
        accountView.render();
        accountView.scrollToLoginElement();

        // Render sessions from the database
        model.state.poo.times.forEach(() => headerView.renderPoo());

    } catch (err) {
        toastView.notify(err);
        console.error(`Error in loginAccount: ${err.message || err}`);
    }
};
// ENTERING ACCOUNT

const controlAccountWindow = function(){
    accountView.render();
    accountView.scrollToLoginElement();
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





const init = function(){
    model.createToday()
    controlClock()
    mainView.addHandlerRender(controlPooButton)
    loginView.addCancelHandler(controlEntryWindow)
    loginView.addEventHandler(controlLogin)
    loginView.addLoginHandler(controlEntryAccount)
    loginView.addSignInHandler(controlSignIn)
    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)
    deleteAccountView.addCancelDeleteHandler(controlAccountWindow)


}

init()