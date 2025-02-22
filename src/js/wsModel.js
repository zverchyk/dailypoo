

let listener = null;  // Stores callback functions

    // Add a function (callback) to listen for WebSocket messages
export const setListener = (callback) => {
        listener= callback
    };

    // Notify all registered listeners when a WebSocket message is received
export const notifyListener=(data)=> {

        if (listener) listener(data);
    }

