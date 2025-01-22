class headerView{
    _parentElement = document.querySelector('.header__poo-case')

    renderPoo(){
        const markup= this._generateMarkUp()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    clearPoo(){
       this._parentElement.innerHTML = ''
    }
    _generateMarkUp(){
        return '<span>💩</span>'
    }
}


export default new headerView()