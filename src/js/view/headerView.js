class headerView{
    _parentElement = document.querySelector('.header__poo-case')
    currentIcon = '💩'
    time = ""
    renderPoo(){
        
        const markup= this._generateMarkUp()
        this._parentElement.insertAdjacentHTML('beforeend', markup)
        this.time=""
    }
    clearPoo(){
       this._parentElement.innerHTML = ''
    }

    deleteOnePoo(){
        const safeId = CSS.escape(this.time);
        this._parentElement.querySelector(`#${safeId}`).remove();
        this.time=""

    }
    addDeleteOneHandler(handler){

        this._parentElement.addEventListener('click', (event)=>{
                if (event.target && event.target.tagName === `SPAN`) {
                    console.log(event.target.id)
                    this.time= event.target.id
                    // this.deleteOnePoo(event.target.id)
                    handler()
                }})
       
    }

    changePooIcon(icon){
        this.currentIcon = icon
        this._parentElement.querySelectorAll('span').forEach((el) => {el.textContent = this.currentIcon})
    }
    _generateMarkUp(){
        return `<span id="${this.time}" data-hover="${this.time}">${this.currentIcon}</span>`
    }
}


export default new headerView()