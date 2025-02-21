
// header with wsView
class headerView{
    _parentElement = document.querySelector('.header__poo-case')
    currentIcon = '💩'
    time = ""
    size = ''
    renderPoo(){
        
        const markup= this._generateMarkUp()
        this._parentElement.insertAdjacentHTML('beforeend', markup)
        this.time=""
        this.size = ''
    }
    clearPoo(){
       this._parentElement.innerHTML = ''
    }

    deleteOnePoo(){
        const safeId = CSS.escape(this.time);
        this._parentElement.querySelector(`#${safeId}`).remove();
        this.time=""
        this.size=''

    }
    addDeleteOneHandler(handler){

        this._parentElement.addEventListener('click', (event)=>{
                if (event.target && event.target.tagName === `SPAN`) {
                    this.time= event.target.id
                    handler()
                }})
       
    }
    addOneRecordHandler(handler){
        document.addEventListener('DOMContentLoaded',()=>{
            handler()
        })
    }

    changePooIcon(icon){
        this.currentIcon = icon
        this._parentElement.querySelectorAll('span').forEach((el) => {el.textContent = this.currentIcon})
    }
    _generateMarkUp(){
        return `<span id="${this.time}" data-hover="${this.time}" style="font-size: ${this.size}; ">${this.currentIcon}</span>`
    }
}


export default new headerView()