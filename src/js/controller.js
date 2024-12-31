import * as model from "./model";



import mainView from "./view/mainView";
import headerView from "./view/headerView";
import loginView from "./view/loginView";
import accountView from "./view/accountView";
import deleteAccountView from "./view/deleteAccountView";



const controlClock = function(){
    setInterval(mainView.updateClock.bind(mainView), 1000)
    mainView.updateClock()
}

const controlPooButton =function(){
    try{
        headerView.renderPoo()
    }
    catch(err){
        console.error(err)
    }
}

const controlLogin = function(){
    try{
        loginView.render()
        loginView.scrollToLoginElement()
     
    }
    catch(err){
        console.error(`my error:  ${err}`)
    }
}

const controlAccount = function(){
    try{
        if(!model.state.user && !model.state.password) {
            const [ user, pass]  = loginView.getUserPass()
            model.state.user = user
            model.state.password = pass
        }

        model.checkLogin()? accountView.render() : accountView.renderError()
        accountView.scrollToLoginElement()



    }catch(err){
        console.error(`my error:  ${err}`)
    }
}

const controlDeleteAccountWindow =function(){
    try{
        deleteAccountView.render()
    }catch(err){
        console.error(err)
    }
}

const controlLogOut = function(){
    try{
       loginView.render(loginView._generateLogInMarkUp())
    }catch(err){
        console.error(err)
    }
}

const controlDeleteAccount = function(){
    const pass = deleteAccountView.getConfirmedPass()
    if(model.checkLogin(pass)){
        loginView.render(loginView._generateLogInMarkUp())
    }
}



const init = function(){
    controlClock()
    mainView.addHandlerRender(controlPooButton)
    loginView.addEventHandler(controlLogin)
    loginView.addLoginHandler(controlAccount)
    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)
    

}

init()