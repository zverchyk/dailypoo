import view from './view'

class GuideView extends view{
    _iconInfoElement = document.querySelector('#guide-icon')
    _parentElement = document.querySelector('.guide-field')
    _overlayElement = document.querySelector('.overlay')
    _tourBoxElement = null
    text = ''
    currentStep = 0
    tourSteps = []
    targetElement =null
    actualStep = null

    welcomeScenario(){
        this.tourSteps.push(
            { 
                element: "#poo-btn", 
                text: "click on icon to start"
                
            })
        
        this.render(scroll=false)
        this.startTour()
        this.showStep()
 

    }

    tourScenario(){
        const steps = [
            { 
                element: "#poo-btn", 
                text: "click to add a record with time"
                
            },
            { 
                element: "#poo-case", 
                text: "Your records are shown here, click on it to delete"
                
            },
            { 
                element: "#poo-btn", 
                text: "Now try to press and hold icon for 2 sec"
                
            },
            { 
                element: "#emoji-button", 
                text: "Click to change your icon", 
                moveDown: true
                
            },
            { 
                element: "#emoji-picker", 
                text: "click on change  icon , then click on menu of picker and choose amoji", 
                moveDown: true
                
            },
            { 
                element: "#receive-graph", 
                text: "Click to open your graph"
                
            },
            { 
                element: "#chartModal", 
                text: "here you graph, with an ability to download it and send to your email you used for registration, close the graph to countinue"
                
            }

            
        ]
        steps.forEach(step =>this.tourSteps.push(step))
        
        this.render(scroll=false)
        this.startTour()
        this.showStep()
    }

    startTour() {
        this._overlayElement.classList.remove("hidden");
        this._tourBoxElement = document.querySelector('#tour-box')
        this._parentElement.classList.remove('hidden')
     
        
    }
    waitForElement(selector, timeout = 3000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
    
            // Check every 100ms if the element exists
            const checkElement = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(checkElement); // Stop checking
                    resolve(element); // Return the element
                }
    
                // Timeout after specified time
                if (Date.now() - startTime > timeout) {
                    clearInterval(checkElement);
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                }
            }, 100);
        });
    }
    
    async showStep() {
        console.log(this.currentStep)
        console.log(this.tourSteps.length)
        if(this.targetElement!== null)this.targetElement.removeEventListener('click', this.actualStep)
        if (this.currentStep >= this.tourSteps.length) {
            this.targetElement = null
            this.endTour();
            return;
        }

    
        const step = this.tourSteps[this.currentStep];
        this.targetElement = await this.waitForElement(step.element)
        
        if (!this.targetElement) {
            console.log('could not find the element')
            throw 'could not find the element'
    }
        // Get element position
        const rect = this.targetElement.getBoundingClientRect();
       this.targetElement.style.zIndex = 6
        // Position the tooltip dynamically
        this._tourBoxElement.style.top = `${rect.top+ rect.height}px`; // Adjust top
        this._tourBoxElement.style.left = `${rect.left+rect.width/10}px`; // Place to the right
    
        this._tourBoxElement.innerText = step.text;
        this.actualStep = this.showStep.bind(this)
        this.targetElement.addEventListener('click', this.actualStep)
        this.currentStep++
        console.log('hello')
        
        
    }


    endTour() {
        this._parentElement.classList.add('hidden')
        this._overlayElement.classList.add("hidden");
         // change to remove
        this._clear()

    }
    addEndTourHandler(){
        this._parentElement.addEventListener('click', ()=>{

        })

    }

    addNextHintHandler(handler){
        document.querySelector('')
    }

    addGuideIconHandler(handler){
        this._iconInfoElement.addEventListener('click', handler)
    }


    _generateMarkUp(){
        // ${this.btn?'<button id="tour-box__btn" class="tour-box__btn">Next</button>': ''}
        return `
            <div  class="tour-box" id="tour-box">
        <p id="tour-box__text" class="tour-box__text">${this.text}</p>

             </div>
        `
    }
}


export default new GuideView()




