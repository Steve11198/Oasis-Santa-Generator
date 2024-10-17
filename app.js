// Import the required modules
const { sendSecretSantaEmail } = require('./emailSender');  // Import the email function from emailSender.js
const cron = require('node-cron');  // Import node-cron for scheduling

// Example list of participants (replace with dynamic inputs if needed)
let participants = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
];

// Function to shuffle participants for random Secret Santa matching
function shuffleParticipants() {
    for (let i = participants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participants[i], participants[j]] = [participants[j], participants[i]];
    }
}

// Function to match participants and send emails
function matchAndSendEmails() {
    shuffleParticipants();  // Shuffle the participants

    // Match participants and send emails
    participants.forEach((santa, index) => {
        // Assign the next person in the list as the gift receiver
        let receiver = participants[(index + 1) % participants.length];
        console.log(`Santa: ${santa.name} will give a gift to ${receiver.name}`);

        // Send the email to each Secret Santa
        sendSecretSantaEmail(santa.email, receiver.name, receiver.email);
    });

    console.log('Secret Santa matches made and emails sent!');
}

// Schedule the matching and email sending to run every 2 minutes
cron.schedule('*/2 * * * *', () => {  // Every 2 minutes
    console.log('Running Secret Santa matching and email sending...');
    matchAndSendEmails();
});

 Uncomment this to run the function immediately if you want instant testing
// matchAndSendEmails();
