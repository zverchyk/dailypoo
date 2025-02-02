export default class View {
    render(scroll = true,customMarkUp=null){
        
        const markup= customMarkUp? customMarkUp: this._generateMarkUp()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
        scroll ? this.scrollToBottom: null

    }
    _clear(){

        this._parentElement.innerHTML = ''
    }
    scrollToBottom(){
        window.scrollTo({
            top: document.body.scrollHeight, // Scroll to the bottom of the document
            behavior: 'smooth' // Optional: Enables smooth scrolling
        }); 
    }

    renderSpinner(){
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', this._markpupSpinner())
    }
    _markpupSpinner(){
        return `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    }
}

