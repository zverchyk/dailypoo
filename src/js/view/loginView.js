import View from "./view"



class loginView extends View{
    _parentElement = document.querySelector('.footer__container')
 


    addEventHandler(handler){  
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'log-btn') {
                handler()

            }
          });
    }


    addLoginHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'go-to-account') {
                console.log(event.target.id)
                handler()

            }
          });
          
    }

    getUserPass(){
        const user = this._parentElement.querySelector('#user').value
        const password = this._parentElement.querySelector('#password').value
        console.log(user, password)
        return [user, password]
    }
    _generateMarkUp(){
        return `<div class="footer__inputs">
                <div class="footer__inputs__labels">
                <label>Email:</label>
                <label for="password">Password:</label>
            </div>
            <div class="footer__inputs__input">
                <input id= "user" type="text" value = '0'>
                <input id= "password" type="text" value = '0'>
            </div>
            <button id="go-to-account" type="submit">Submit</button>
            </div>`
    }

    _generateLogInMarkUp(){
        return `<button class="login__log-btn" id="log-btn">Log in</button>`
    }
}

export default new loginView()