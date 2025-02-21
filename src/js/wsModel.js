

let listener = null;  // Stores callback functions

    // Add a function (callback) to listen for WebSocket messages
export const setListener = (callback) => {
        console.log('setlistener')
        listener= callback
    };

    // Notify all registered listeners when a WebSocket message is received
export const notifyListener=(data)=> {
        console.log('nofity listener')
        if (listener) listener(data);
    }

