import View from "./view";

class accountView extends View{
    _parentElement = document.querySelector('.footer__container')

    addReceiveGraphHandler(handler){

    }
    

    addLogoutHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'log-out') {
                handler()

            }
          });
    }
    
    renderloading(){
        this.render(this._generateLoadingMarkUp)
    }

    renderError(){
        this.render(this._generateErrorMarkUp)
    }
    _generateErrorMarkUp(){
        return `            <div class="login-error">
                <p>incorect pass or email</p>
                <button id='log-out'>Retry</button>
            </div>
        `
    }
    _generateLoadingMarkUp(){
        return `
        <p>Loading...</p>`
    }

    _generateMarkUp(){
        return `
        <div class="footer__account">
                <button class="footer__account__graph receive-graph" >Receive graph</button>
                <button class="footer__account__delete delete-account" id="delete-account">Delete Account</button>
                <button class="footer__account__logout" id="log-out">Log out</button>
        `
    }




}



export default new accountView()