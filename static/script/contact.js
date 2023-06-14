//---------------------------------MESSAGE BOT DISCORD------------------------------------------//

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    const webhookUrl = 'https://discord.com/api/webhooks/1118520342407819305/DuUEH2Q3xxCqfLba21oJqu0bUCDFr8IxteAD2TyAqlNrmsBVgyaj1ZlvP84SDI5r8dZi';
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        });
});
