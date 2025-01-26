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
    addCancelDeleteHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'return-to-account') {
                handler()

            }
          });
    }
    getConfirmedPass(){
        return document.getElementById('confirmation-pass').value
    }

    _generateMarkUp(){
        return     `
           <div></div>
           <div class="delete__pass">
        <input type="text" id='confirmation-pass' placeholder="type your password">
        <button id='delete-submit' class="delete__submit">Submit</button>
        <button id="return-to-account" class="delete__cancel">Cancel</button>
    </div>
       <div></div>`
    }
}


export default new deleteAccountView()
