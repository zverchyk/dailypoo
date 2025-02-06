export const handler = async () => {
    const API_URL = "https://https://pooapi.onrender.com"; // Replace with your API URL
    
    try {
        const response = await fetch(API_URL);
        const status = response.status;
        console.log(`API Keep-Alive Ping: ${status}`);
        return { statusCode: 200, body: "Ping Successful" };
    } catch (error) {
        console.error("API Keep-Alive Failed:", error);
        return { statusCode: 500, body: "Ping Failed" };
    }
};
