import view from "./view";
import Chart from 'chart.js/auto';

class chartView extends view{
    _parentElement = document.querySelector('.wrapper')

    addCloseChartHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='close-graph') {
                this._parentElement.style.display = 'none'
                document.querySelector('.overlay').style.display = 'none'
                console.log('close')
                handler()
            }
          });
    }

    addDownloadChartHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='download-graph') {
                handler()
            }
          });
    }
    addSendChartHandler(handler){
        this._parentElement.addEventListener('click', (event) => {
            if (event.target && event.target.id==='send-graph') {
                handler()
            }
          });
    }

    renderChart(config){
        document.querySelector('.overlay').style.display = 'block'
        // renames the parent element after the modal is created 

        if(this._parentElement.classList.contains('wrapper')){
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkUp())
        this._parentElement = document.querySelector('.modal')
            // Render the chart with a smaller canvas
        const canvas = document.getElementById('bubbleChartCanvas');
        canvas.width = 200;  // 3x smaller
        canvas.height = 200; // 3x smaller

        const ctx = canvas.getContext('2d');
        new Chart(ctx, config);

        return 
        }


        this._parentElement.style.display = 'block'
        console.log('render')

    }


    _generateMarkUp(){
        return `   


    <!-- Popup Modal -->
    <div class="modal" id="chartModal">
        <button class="close-chart-btn" id="close-graph">X</button>
        <canvas id="bubbleChartCanvas"></canvas>

        <!-- Footer Buttons -->
        <div class="modal-footer">
            <button class="btn" id="download-graph" onclick="downloadChart()">Download PNG</button>
            <button class="btn" id="send-graph">Send to Email</button>
        </div>
    </div>`
    }
                
}

export default new chartView()