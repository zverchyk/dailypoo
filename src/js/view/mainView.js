class mainView{
    _parentElement = document.getElementById('clock');
    _pooButton = document.querySelector('.poo-button');


    updateClock() {
        const now = new Date();
      
        // Format time as HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
     
        this._parentElement.textContent = `${hours}:${minutes}:${seconds}`;
      }

    addHandlerRender(handler){
  
        this._pooButton.addEventListener('click', handler)
    }
      
}

export default new mainView()