export default async (req) => {
    const { next_run } = await req.json();

    console.log("Connecting to API. Next invocation at:", next_run);

    // Your API connection code here
    try {
        const response = await fetch("https://pooapi.onrender.com/");
        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error fetching API:", error);
    }

    return new Response("Scheduled function executed", { status: 200 });
};

export const config = {
    schedule: "*/15 * * * *" // Runs every 15 minutes
};

