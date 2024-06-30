// Example frontend script (JavaScript)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageContainer = document.getElementById('message-container');

    // Replace with actual API endpoints
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;

        sendMessage(message);
        messageInput.value = '';
    });

    async function sendMessage(message) {
        try {
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            displayMessage(data.message);
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    }

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
});
