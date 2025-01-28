import View from "./view";

class accountView extends View{
    _parentElement = document.querySelector('.footer__container')
    username = ''
    currentIcon = ''
    advice= ''

    addGraphHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='receive-graph') {
                handler()
            }
          });
    }

    
    addEditHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='user-edit') {
                handler()
            }
          });
    }

    addIconHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('icon1')) {
                this.currentIcon = '💩'
                handler()
            }
            if (event.target && event.target.classList.contains('icon2')) {
                this.currentIcon = '🦄'
                handler()
            }
          })
    }
    

    addLogoutHandler(handler){
        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'log-out') {
                handler()

            }
          });
    }

    

    _generateMarkUp(){
        return `
                <div class="user-block">
                <div class="user-block__info">
                    <div class="user-icon"></div>
                    <div class="user-name">${this.username}</div>
                </div>
                <div class="user-block__icon-choice">
                    <button class="icon1">💩</button>
                    <button class="icon2">🦄</button>
                </div>
                <button class="user-edit" id="user-edit">Edit</button>
            </div>
        <div class="footer__account">
                <button class="footer__account__graph receive-graph" id="receive-graph" >Receive graph</button>
                <button class="footer__account__delete delete-account" id="delete-account">Delete Account</button>
                <button class="footer__account__logout" id="log-out">Log out</button>
            </div>
                    <div class="advice-block">
                 <blockquote>Advice: ${this.advice? this.advice: 'Eat more fiber'}<blockquote>
            </div>
        `
    }




}



export default new accountView()