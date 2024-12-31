export default class View {
    render(customMarkUp){
        
        const markup= customMarkUp? customMarkUp: this._generateMarkUp()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    _clear(){
        this._parentElement.innerHTML = ''
    }
    scrollToLoginElement(){
        // Scroll to an element with smooth behavior
    this._parentElement.scrollIntoView({
    behavior: 'smooth',
    block: 'end' // Align to the top of the viewport
    });}
}

