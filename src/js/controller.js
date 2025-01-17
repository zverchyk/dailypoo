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
const controlPooHeader =async function(){
    if(!model.state.user.id) return 
    
    }

const controlPooButton = async function(){
    try{
        if(!model.state.user.id) {
            toastView.notify("log in to poo)")
            return }
        const now = new Date();

        // Get current time in HH:MM:SS format and date in DD:MM:YY format
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        const date = now.toLocaleDateString('en-GB')

        if(model.state.poo.day==='') model.state.poo.day = date
        model.state.poo.pooTimes.push(time)
        const pooResposnse = await model.addPoo()
        headerView.renderPoo()
        toastView.notify(pooResposnse)
    }
    catch(err){
        console.error(err)
    }
}


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


// subfunctions 
const createAccount = async function(){
    try{
        const [ user, pass]  = loginView.getUserPass()
        model.state.user.name = user
        model.state.user.password = pass
        const isExist = await model.doesUserExist()
        console.log(isExist)
        if( !isExist) {
            const response = await model.createUser()
            if (!response) {
                toastView.notify(`user creation failed`)
                return 
            }
            accountView.render()
            accountView.scrollToLoginElement()
            toastView.notify(`Account succesfully created`)
        }

        if( isExist) {
            toastView.notify(`user name in use`)
            console.log('user exist')
        }

        
    }catch(err){
        console.error(`my error:  ${err}`)
    }
}

const enterAccount = async function(){
    try{
        if(!model.state.user.name && !model.state.user.password) {
            const [ user, pass]  = loginView.getUserPass()
            model.state.user.name = user
            model.state.user.password = pass
        }


        await model.checkLogin()? accountView.render() : accountView.renderError()
        accountView.scrollToLoginElement()
        if(await model.checkLogin()) {
            toastView.notify('you have succesfuly logged in')
            accountView.render()
            // load the poo list
            const list = await model.getPooList()
            list.forEach(()=> headerView.renderPoo())

        }else{
            toastView.notify("account doesn't exits")
        }

   
       


    }catch(err){
        console.error(`my error:  ${err}`)
    }
}

const controlAccount = async function(){
    console.log(model.state.mode)
    if (model.state.mode === 'sign-in') await createAccount()
    if (model.state.mode === 'log-in') await enterAccount()

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
        model.resetState()
       loginView.render(loginView._generateLogInMarkUp())
       toastView.notify("You succesfully logged out")

    }catch(err){
        console.error(err)
    }
}

const controlDeleteAccount = async function(){
    const pass = deleteAccountView.getConfirmedPass()
    if(model.state.user.password === pass){

    //    await model.deleteUser(model.state.user.id) ? loginView.render(loginView._generateLogInMarkUp()): console.log('smth went wrong')

    if(await model.deleteUser(model.state.user.id)){
        toastView.notify('account succsesfully deleted')
        loginView.render(loginView._generateLogInMarkUp())

    }else{
        toastView.notify('smth went wrong try one more time')
    }
    }else{
        toastView.notify('wrong pass')
        console.log("wrong pass")
    }

}



const init = function(){
    controlClock()
    mainView.addHandlerRender(controlPooButton)
    loginView.addEventHandler(controlLogin)
    loginView.addLoginHandler(controlAccount )
    loginView.addSignInHandler(controlSignIn)
    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)


}

init()