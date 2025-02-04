import view from './view'



class welcomeView extends view{
    _parentElement = document.querySelector('.footer__container')
    mode = null

    addEntryOptionHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'sign-up-btn') {
                this.mode = 'sign-up'
                handler()
            }
            if (event.target && event.target.id === 'log-in-btn') {
                this.mode = 'log-in'
                handler()
            }
          });
    }


    _generateMarkUp(){
        return `            <div class="login">
                <button class="login__log-btn" id="log-in-btn">Log in</button>
                <button class="login__sign-btn" id="sign-up-btn">Sign up</button>
            </div>`
    }
}


export default new welcomeView()