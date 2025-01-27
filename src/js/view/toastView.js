

class toastView {
    _parentElement = document.querySelector('#toast-container')
    message = ''

    notify(message) {
        this.message = message;
        const toastElement = document.createElement('div');
        toastElement.classList.add('toast');
        toastElement.textContent = this.message;
    
        // Append the toast to the container
        this._parentElement.appendChild(toastElement);
    
        // Remove the specific toast after 5 seconds
        setTimeout(() => {
          toastElement.remove();
        }, 5000);
      }



}

export default new toastView()