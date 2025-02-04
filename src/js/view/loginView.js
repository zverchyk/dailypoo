import View from "./view"



class loginView extends View{
    _parentElement = document.querySelector('.footer__container')
 


    addLoginHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'go-to-account') {
                handler()

            }
          });
          
    }

    addCancelHandler(handler){
        document.body.addEventListener('click', (event)=>{
            if (event.target && event.target.id === 'go-to-login') {
                  handler()
            }
        })
    }
    addExistUserError(){
        document.querySelector('.user-name-container').classList.add('error')
    }

    getUserPass(){
        const user = this._parentElement.querySelector('#user').value
        const password = this._parentElement.querySelector('#password').value
        return [user, password]
    }
    _generateMarkUp(){
        return `<div class="footer__inputs">
            <div class="footer__inputs__input">

                <input id= "user" type="text" placeholder="email" >

                <input id= "password" type="text" placeholder="password">
            </div>
            <div class="footer__inputs__buttons">
                <button id="go-to-account" type="submit" class="submit-button">Submit</button>
                <button id="go-to-login" class="cancel-button">Cancel</button>
            </div>
            </div>`
    }


}

export default new loginView()