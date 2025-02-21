import * as wsModel from "./wsModel"
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


let socket = null
export const openWebSocket = function(userId){
    socket = new WebSocket(process.env.WEBSOCKET);
    socket.onopen = () => {
        socket.send(JSON.stringify({ type: "register", userId })); // Register client
        console.log("WebSocket connected.");
    };

    socket.onmessage = async (event) => {
        let data = event.data
        try{
            if (data instanceof Blob) {
                const text = await data.text(); // Convert Blob to text
                try {
                    data = JSON.parse(text); // Now safely parse it
                    console.log(data);
    
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }
        finally{
            data = JSON.parse(data)
            wsModel.notifyListener(data);

        }
            

    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);

}

export const closeWebSocket = function(userId){
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "close", userId }));
        socket.close();
        console.log("WebSocket closed.");
    }
}

export const onMessage = function(callback){
    console.log('onmessage called')
    wsModel.setListener(callback)
}



