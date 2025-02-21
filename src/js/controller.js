import * as model from "./model";
import * as bridge from './bridge'


import mainView from "./view/mainView";
import headerView from "./view/headerView";
import loginView from "./view/loginView";
import accountView from "./view/accountView";
import deleteAccountView from "./view/deleteAccountView";
import toastView from "./view/toastView";
import chartView from "./view/chartView";
import editAccountView from "./view/editAccountView";
import userBlockView from "./view/userBlockView";

import guideView from "./view/guideView";
import welcomeView from "./view/welcomeView";






// starts front-end clock 
const controlClock = function(){
    setInterval(mainView.updateClock.bind(mainView), 1000)
    mainView.updateClock()
}


//  ######## ADDING RECORDS ###########

//  constrols all actions for Main button
const controlPooButton = async function(){
        
    if(!model.state.user.id) {
        toastView.notify("log in or sing in to poo)")

        setTimeout(()=>{loginView.scrollToBottom()}, 1000)
     
        return
     }
        const now = new Date();

    try{

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
        addRecord(time, iconSize)

        const pooResposnse = await model.updateSession()
        toastView.notify(pooResposnse)
        
    }
    catch(err){
        toastView.notify(err)
        console.error(err)
    }
}

// adds record to the front list and updated header poo case
const addRecord = function(time, iconSize){
    
    if(model.state.poo.times.length>=10) throw 'temporary limit 10 records'
    createAdvice()
    model.state.poo.times.push(time)
    model.state.poo.sizes.push(iconSize)

        headerView.time = time
        headerView.size =iconSize
        headerView.renderPoo()
}

// callback function to update poo case
const controlIotRequest = function(){
    bridge.onMessage((data)=>{
            addRecord(data.time, data.iconSize)
        })

}

// creates window for log in or sing up 
const controlEntry = function(){
    try{
        loginView.render()
        model.state.mode = welcomeView.mode
    }
    catch(err){
        toastView.notify(err)

    }
}

// checks either user sings-up or logs-in
const controlEntryAccount = async function(){
    model.createToday()
    if (model.state.mode === 'sign-up') await createAccount()
    if (model.state.mode === 'log-in') await loginAccount()

}

// creates new account 
const createAccount = async function(){
    const [ user, pass]  = loginView.getUserPass()
 
    try{
        if (!user || !pass) {
            throw 'Please enter your email and password'
          
        }
       if ( !model.validateEmail(user)){
            throw 'Please enter a valid email'
       }
       const passValidation = model.validatePassword(pass)

       if (typeof passValidation === 'string'){
        throw passValidation
   }

        model.state.user.email = user;
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

// enters existed account 
const loginAccount = async function () {
    
        const [user, pass] = loginView.getUserPass();

    try {
        if (!user || !pass) {
            throw 'Please enter your email and password'
          
        }
    
        model.state.user.email = user;
        model.state.user.password = pass;
        accountView.renderSpinner()

     
        const response = await model.loginUser()
        toastView.notify(response);
       
        // changes icon button in user-block
        userBlockView.currentIcon = model.state.user.icon
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


// changes current advice to new one
const createAdvice = async function(){
    try{
        accountView.advice =  await model.getAdvice()
        accountView.changeAdvice()
    }catch(err){
        toastView.notify('a good advice did not come to you today')
    }
    
}

// ####### EDIT USER #######

// opens window to change user log-in data
const controlEditAccountWindow =function(){

    editAccountView.email = model.state.user.email
    editAccountView.password = model.state.user.password
    editAccountView.init()
    editAccountView.render()
    editAccountView.addCancelHandler(controlAccountWindow)
    editAccountView.addSaveHandler(saveEditedUser)
}

// saves changed user log-in data
const saveEditedUser = async function(){
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
// changes icon due to changes in user block
const controlIcon = function(){
    let icon = model.state.user.icon
    // checks if icon was changed in userblock
    if(userBlockView.currentIcon!== icon && userBlockView.currentIcon!==""){
       icon = userBlockView.currentIcon
       model.state.updatedUser.newIcon = icon
    }
    mainView.changePooIcon(icon)
    headerView.changePooIcon(icon)
}




// creates user control panel
const controlAccountWindow = function(){

    accountView.render();
    userBlockView.init()
    userBlockView.username = model.state.user.email
    userBlockView.render()
    userBlockView.addIconHandler(controlIcon)
    userBlockView.addEditHandler(controlEditAccountWindow)

// 


}

//  ####### ENTER #######
// creates welcome panel for entering and creating to the account 
const controlEntryWindow =function(){
    try{
        welcomeView.render()
    }catch(err){
        toastView.notify(err)
    }
}


// logs-out
const controlLogOut = async function(){
    try{
        accountView.renderSpinner()
        // checks if the icon was changed during the session
       if(model.state.user.icon !== model.state.updatedUser.newIcon && model.state.updatedUser.newIcon !==""){
        await model.updateUser()
        toastView.notify('icon updated')
       } 

       accountView.renderSpinner()
       model.resetState()
       welcomeView.render()
       headerView.clearPoo()
       const response =await model.logout()
 
       toastView.notify(response)

    
       location.reload();

    }catch(err){
        console.error(err)
        toastView.notify(err)
    }
}



// ####### DELETING USER AND POO DATA #######

// delete user account with all related data
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
// creates delete window 
const controlDeleteAccountWindow =function(){
    try{
        deleteAccountView.render()
    }catch(err){
        console.error(err)
    }
}


// ####### GRAPHS #######

// creates new or opens existing graph
const controlGraph = async function(){
    try{
        // chartView.disableScroll()
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
// closes graph window
const controlCloseChart = function(){
    chartView.enableScroll()
    chartView.closeChart()

}

// downloads graph to user device
const controlDownloadingChart =  function(){
    try{
        const response =  model.downloadChart()
        toastView.notify(response)
    }catch(err){
        toastView.notify(err)
    }
}

//  ###### EMAIL ######
// sends Graph to the user email
const controlSendingChart = async function(){
    try{
        const response = await model.sendChart()
        toastView.notify(response)
    }catch(err){
        console.error(err)
        toastView.notify(err)
    }   
}



// deletes one header record from the view and current session 
const cotrolDeleteOneIcon = async function(){

    try{
    // delete one poo from the list 
    const index = model.state.poo.times.indexOf(headerView.time);
    if (index !== -1) {
        model.state.poo.times.splice(index, 1);
        model.state.poo.sizes.splice(index, 1)

        }

    
    // update the list
    const pooResposnse = await model.updateSession()
    toastView.notify('deleted')
    toastView.notify(pooResposnse)
    // delete the poo from the page
    headerView.deleteOnePoo()

    }catch(err){
        toastView.notify(err)
    }

    
}

//  ###### GUIDE ########
// activates welcome guide once if user do nothing for 4 sec
const inactivityHandler = function() {
    let inactivityTimer;
    let hasRun = false;

    function runOnce() {
        if (!hasRun) {
            guideView.welcomeScenario(); // Your function
            hasRun = true; // Prevents further execution

            // Remove event listeners to prevent further detection
            ["mousemove", "keypress", "scroll", "touchstart"].forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        }
    }

    function resetTimer() {

        if(model.state.mode) hasRun =true
        // If already run, remove event listeners
        if (hasRun) {
            ["mousemove", "keypress", "scroll", "touchstart"].forEach(event => {

                window.removeEventListener(event, resetTimer);})
                return 
        }

        clearTimeout(inactivityTimer); // Clear existing timer
        inactivityTimer = setTimeout(runOnce, 2000); // 2 seconds inactivity
    }

    // Attach event listeners for activity detection
    ["mousemove", "keypress", "scroll", "touchstart"].forEach(event => {
        window.addEventListener(event, resetTimer);
    });

    // Start the initial timer
    resetTimer();
};

// initial guied tour for first time visitor
const controlGuideTour = function(){
    try{if(model.state.user.email !== ""){
        guideView.tourScenario()}
        else{
            throw "you need to log in first"
        }}catch(err){
            toastView.notify(err)
        }
}




const init = function(){

    model.createToday()
    controlClock()
    inactivityHandler()
    mainView.addStopGrowingPoo()
    mainView.addGrowingHandler()
    mainView.addHandlerRender(controlPooButton)
    welcomeView.addEntryOptionHandler(controlEntry)
    loginView.addCancelHandler(controlEntryWindow)

    loginView.addLoginHandler(controlEntryAccount)

    deleteAccountView.addDeleteAccountWindowHandler(controlDeleteAccountWindow)
    accountView.addLogoutHandler(controlLogOut)
    accountView.addGraphHandler(controlGraph)
    deleteAccountView.addDeleteAccountHandler(controlDeleteAccount)
    deleteAccountView.addCancelDeleteHandler(controlAccountWindow)
    chartView.addCloseChartHandler(controlCloseChart)
    chartView.addDownloadChartHandler(controlDownloadingChart)
    chartView.addSendChartHandler(controlSendingChart)
    headerView.addDeleteOneHandler(cotrolDeleteOneIcon)

    // websocket
    headerView.addOneRecordHandler(controlIotRequest)

    guideView.addGuideIconHandler(controlGuideTour)

}

init()