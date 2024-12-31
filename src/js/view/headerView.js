class headerView{
    _parentElement = document.querySelector('.header__poo-case')

    renderPoo(){
        const markup= this._generateMarkUp()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    _generateMarkUp(){
        return '<span>💩</span>'
    }
}


export default new headerView()