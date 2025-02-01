export default class View {
    render(customMarkUp){
        
        const markup= customMarkUp? customMarkUp: this._generateMarkUp()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
        window.scrollTo({
            top: document.body.scrollHeight, // Scroll to the bottom of the document
            behavior: 'smooth' // Optional: Enables smooth scrolling
        });
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

