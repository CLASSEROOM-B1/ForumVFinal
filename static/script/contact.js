//---------------------------------MESSAGE BOT DISCORD------------------------------------------//
console.log("test");
const form = document.getElementById('form');
console.log(form);
console.log(document.getElementById('message'));
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    // const webhookUrl = 'https://discord.com/api/webhooks/1099359183469555784/OJUNZMawEZv4F_TlWfQgVxvwbQlm3XnYetegVNaBDF8IDIqtJebsWLtAF02j6yehB55S';

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
                console.error(message);
                alert('Failed to send message.');
            }
        })
        .catch(error => {
            console.error(message);

            console.error('Error sending message:', error);
            alert('Failed to send message.');
        });
});
