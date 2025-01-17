import View from "./view"

class toastView extends View{
    _parentElement = document.querySelector('#toast-container')
    message = ''

    notify(message){
        this.message = message
        this.render()
            // Remove the toast after 5 seconds
        setTimeout(() => {
           this._clear()
        }, 5000);
    }


    _generateMarkUp(){
        return `    <div class="toast">${this.message}</div>`
    }
}

export default new toastView()