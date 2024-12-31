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
    


    renderError(){
        console.log('incorect pass or email')
    }

    _generateMarkUp(){
        return `
        <div class="footer__account">
                <button class="footer__accout__graph receive-graph" >Receive graph</button>
                <button class="footer__accout__delete delete-account" id="delete-account">Delete Account</button>
                <button class="footer__accout__logout" id="log-out">Log out</button>
        `
    }




}



export default new accountView()