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
                handler()

            }
          });
          
    }
    addSignInHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'sign-btn') {
                handler()

            }
          });
    }
    addExistUserError(){
        document.querySelector('.user-name-container').classList.add('error')
    }

    getUserPass(){
        const user = this._parentElement.querySelector('#user').value
        const password = this._parentElement.querySelector('#password').value
        console.log(user, password)
        return [user, password]
    }
    _generateMarkUp(){
        return `<div class="footer__inputs">
            <div class="footer__inputs__input">

                <input id= "user" type="text" placeholder="email" value="admin">

                <input id= "password" type="text" placeholder="password" value="admin">
            </div>
            <button id="go-to-account" type="submit">Submit</button>
            </div>`
    }

    _generateLogInMarkUp(){
        return `            <div class="login">
                <button class="login__log-btn" id="log-btn">Log in</button>
                <button class="login__sign-btn" id="sign-btn">Sign in</button>
            </div>`
    }
}

export default new loginView()