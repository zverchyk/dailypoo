import view from './view'


class editAccountView extends view{
    _parentElement = null
    email = ''
    password = ''

    /** ✅ Initialize the view only when needed */
    init() {
        this._parentElement = document.querySelector(".user-block");
        if (!this._parentElement) {
            console.error("⚠️ userBlockView: `.user-block` not found!");
            return;
        }
    }

    addSaveHandler(handler){
        if (!this._parentElement) this.init();
        this._parentElement.addEventListener('click', (event)=>{
            if (event.target && event.target.id==='submit-btn') {
                handler()
            }
        })
    }
    addCancelHandler(handler){
        if (!this._parentElement) this.init();
        this._parentElement.addEventListener('click', (event)=>{
            if (event.target && event.target.id==='cancel-btn') {
                handler()
            }
        })
    }
    getUserInput(){
        const newEmail = this._parentElement.querySelector('#email').value
        const newPassword = this._parentElement.querySelector('#password').value
        return [newEmail, newPassword]
    }
    _generateMarkUp(){
        return `
            <div class="edit_user">
    <input type="text" id="email" placeholder="new email" value="${this.email}">
    <input type="text" id="password" placeholder="new password" value="${this.password}">
    <button class="submit-button" id="submit-btn">Submit</button>
    <button class="cancel-button" id="cancel-btn">Cancel</button>
    </div>
        `
    }
}

export default new editAccountView()