export default class View {
    render(customMarkUp){
        
        const markup= customMarkUp? customMarkUp: this._generateMarkUp()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    _clear(){
        this._parentElement.innerHTML = ''
    }
    scrollToElement(){
        // Scroll to an element with smooth behavior
    this._parentElement.scrollIntoView({
    behavior: 'smooth',
    block: 'end' // Align to the top of the viewport
    });}
    scrollToBottom(){
        window.scrollTo({
            top: document.body.scrollHeight, // Scroll to the bottom of the document
            behavior: 'smooth' // Optional: Enables smooth scrolling
        });
    }
}

