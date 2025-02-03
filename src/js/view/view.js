export default class View {
    async render(scroll = true,customMarkUp=null){
        
        const markup= customMarkUp? customMarkUp: this._generateMarkUp()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
        scroll ? await this.scrollToBottom(): null

    }
    _clear(){

        this._parentElement.innerHTML = ''
    }
    async scrollToBottom() {
        return new Promise((resolve) => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    
            setTimeout(() => {
                resolve(window.scrollY);
            }, 1000); // Adjust timeout based on scroll speed
        });
    }
    async scrollToUp() {
        return new Promise((resolve) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
    
            setTimeout(() => {
                resolve(window.scrollY);
            }, 1000); // Adjust timeout based on scroll speed
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

