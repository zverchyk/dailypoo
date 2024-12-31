import View from "./view";

class deleteAccountView extends View{
    _parentElement = document.querySelector('.footer__container')

    addDeleteAccountWindowHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'delete-account') {
                handler()

            }
          });
    }
    addDeleteAccountHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'delete-submit') {
                handler()

            }
          });
    }
    getConfirmedPass(){
        return document.getElementById('confirmation-pass').value
    }

    _generateMarkUp(){
        return     `<div class="delete__pass">
        <input type="text" id='confirmation-pass' placeholder="type your password for confirmation" value = '0'>
        <button id='delete-submit'>Submit</button>
        <button id="go-to-account">Cancel</button>
    </div>`
    }
}


export default new deleteAccountView()