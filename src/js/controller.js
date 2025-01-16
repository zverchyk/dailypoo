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
        model.state.mode = 'log-in'
        // model.createUser({name: 'jack', password: 'jack'})
     
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
            const data = await model.createUser()
            console.log(data)
            accountView.render()
            accountView.scrollToLoginElement()
        }

        if( isExist) {
            loginView.addExistUserError()
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

    }catch(err){
        console.error(err)
    }
}

const controlDeleteAccount = async function(){
    const pass = deleteAccountView.getConfirmedPass()
    if(model.state.user.password === pass){
       await model.deleteUser(model.state.user.id) ? loginView.render(loginView._generateLogInMarkUp()): console.log('smth went wrong')
    }else{
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