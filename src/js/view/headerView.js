class headerView{
    _parentElement = document.querySelector('.header__poo-case')
    currentIcon = '💩'
    renderPoo(){
        const markup= this._generateMarkUp()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    clearPoo(){
       this._parentElement.innerHTML = ''
    }
    changePooIcon(icon){
        this.currentIcon = icon
        this._parentElement.querySelectorAll('span').forEach((el) => el.textContent = this.currentIcon)
    }
    _generateMarkUp(){
        return `<span>${this.currentIcon}</span>`
    }
}


export default new headerView()