class mainView{
    _parentElement = document.getElementById('clock');
    _pooButton = document.querySelector('.poo-button');
    growing = undefined;
    _startSize= 100
    currentIcon = "💩"
    currentSize = this._startSize



    updateClock() {
        const now = new Date();
      
        // Format time as HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
     
        this._parentElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
    changePooIcon(icon){
        this.currentIcon = icon
        this._pooButton.textContent = this.currentIcon
    }
    growPoo() {
       
   
            let fontSize = parseFloat(window.getComputedStyle(this._pooButton).fontSize); // Get fresh font size
            let toGrow = true

            this.growing = setInterval(() => {

               if (toGrow) {
                    fontSize += 2;
                    if (fontSize > 300) {
                         toGrow = false; 
                    }
                } 
        
 
        
                // ✅ Apply final size
                this._pooButton.style.fontSize = fontSize + "px";
                this.currentSize = fontSize;
            }, 40);
            
 

    }
    addStopGrowingPoo(){
        ["mouseup", "mouseleave","touchend", "touchcancel"].forEach((event)=>{
            this._pooButton.addEventListener(event, () => {
                clearInterval(this.growing);
            });
        })
    }
    

    explodePoo(){
        const iconRect = this._pooButton.getBoundingClientRect();

        const createParticle = (iconRect, icon, animation, index, yOffset) =>{
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${iconRect.left + iconRect.width / 2 - 25}px`; // Centering horizontally
            particle.style.top = `${iconRect.top + yOffset}px`; // Position at launch level
            particle.style.animation = `${animation} 1.2s cubic-bezier(0.3, 0.6, 0.4, 1) ${index * 0.1}s forwards`;
            particle.textContent = icon;
    
            document.body.appendChild(particle);
    
            // Remove the particle after animation completes
            setTimeout(() => {
                particle.remove();
            }, 1300);

            
        }
        // Define three symmetrical launch levels
        const launchPoints = [
            { yOffset:100 },   // Top level
            { yOffset: 150 },  // Between top & middle
            { yOffset: 200 }   // Middle level
        ];

        for (let i = 0; i < 3; i++) {
            createParticle(iconRect, this.currentIcon, "parabolic-left", i, launchPoints[i].yOffset);
            createParticle(iconRect, this.currentIcon, "parabolic-right", i, launchPoints[i].yOffset);
        }
   


}


    addHandlerRender(handler){
        this._pooButton.addEventListener("click", () => {
            this.explodePoo()
            this._pooButton.style.fontSize = this._startSize + "px";
            handler()
            });
        }
    addGrowingHandler(){
        ['mousedown', 'touchstart'].forEach((event)=>{
            this._pooButton.addEventListener(event, () => {
                this.growPoo()
            });
        })
    }
      

}
export default new mainView()