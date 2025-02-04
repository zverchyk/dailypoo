import View from "./view";
import 'emoji-picker-element';

class accountView extends View{
    _parentElement = document.querySelector('.footer__container')
    advice= ''

    changeAdvice(){
        this._parentElement.querySelector('blockquote').textContent = this.advice
    }
 

    addLogoutHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'log-out') {
                handler()

            }
          });
    }
    addGraphHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='receive-graph') {
                handler()
            }
          });
    }

    _generateMarkUp(){
        return `
                <div class="footer__container__item user-block">
               
            </div>
        <div class="footer__container__item footer__account">
                <button class=" footer__account__graph receive-graph" id="receive-graph" >Open graph</button>
                <button class="footer__account__delete delete-account" id="delete-account">Delete Account</button>
                <button class="footer__account__logout" id="log-out">Log out</button>
            </div>
                    <div class="footer__container__item advice-block">
                 <blockquote> ${this.advice? this.advice: 'Eat more fiber'}</blockquote>
            </div>
        `
    }

    
}



export default new accountView()