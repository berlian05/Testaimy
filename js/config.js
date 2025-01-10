const CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api/openai',
    ENDPOINTS: {
        SEND_MESSAGE: '/v1/chat/completions'
    }
};

// Export the configuration
window.CONFIG = CONFIG; 