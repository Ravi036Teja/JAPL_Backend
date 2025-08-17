import axios from 'axios';

const backendUrl = "https://japl-backend.onrender.com"; // e.g., "https://your-app-name.onrender.com"

const pingServer = async () => {
    try {
        const response = await axios.get(backendUrl);
        console.log(`Server pinged successfully at ${new Date().toISOString()}`);
    } catch (error) {
        console.error(`Error pinging server at ${new Date().toISOString()}:`, error.message);
    }
};

pingServer();