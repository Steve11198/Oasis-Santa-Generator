document.addEventListener("DOMContentLoaded", function() {
    let participants = JSON.parse(localStorage.getItem("participants")) || [];

    // Load existing participants on page load
    updateNameList();

    // Add participant to the list
    document.getElementById("add-name").addEventListener("click", function() {
        const nameInput = document.getElementById("name").value.trim();
        const emailInput = document.getElementById("email").value.trim();
        
        if (nameInput && emailInput && validateEmail(emailInput)) {
            participants.push({ name: nameInput, email: emailInput });
            localStorage.setItem("participants", JSON.stringify(participants)); // Save to localStorage
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            updateNameList();
        } else {
            alert("Please enter a valid name and email.");
        }
    });

    // Update the displayed participant list
    function updateNameList() {
        const nameList = document.getElementById("name-list");
        nameList.innerHTML = '';

        participants.forEach(participant => {
            let li = document.createElement("li");
            li.textContent = `${participant.name} (${participant.email})`;
            nameList.appendChild(li);
        });
    }

    // Validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Schedule Secret Santa matching for 1 week later
    document.getElementById("schedule-matching").addEventListener("click", function() {
        if (participants.length < 2) {
            alert("You need at least 2 participants to schedule matching.");
            return;
        }

        alert("Secret Santa matching has been scheduled for 3 days from today.");
        
        const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Simulate scheduling matching (email notifications should be handled server-side)
        setTimeout(function() {
            matchParticipants();
        }, oneWeekFromNow - Date.now());
    });

    // Simulate Secret Santa matching
    function matchParticipants() {
        let shuffledParticipants = [...participants];
        shuffleArray(shuffledParticipants);

        const pairs = [];

        for (let i = 0; i < participants.length; i++) {
            let santa = participants[i];
            let receiver = shuffledParticipants[i];

            // Ensure no one is their own Secret Santa
            if (santa.name === receiver.name) {
                alert("Failed to assign. Try again!");
                return;
            }

            pairs.push(`${santa.name} is Secret Santa for ${receiver.name}`);
        }

        displayPairs(pairs);

        // Email logic would be here (handled server-side)
        sendEmails(pairs);
    }

    // Shuffle array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Display Secret Santa pairs
    function displayPairs(pairs) {
        const pairList = document.getElementById("pair-list");
        pairList.innerHTML = '';

        pairs.forEach(pair => {
            let li = document.createElement("li");
            li.textContent = pair;
            pairList.appendChild(li);
        });
    }

    // Simulated email sending (this should be done server-side)
    function sendEmails(pairs) {
        pairs.forEach(pair => {
            console.log(`Sending email for: ${pair}`); // In a real-world scenario, you'd send emails here.
            // Email logic can involve using a service like Node.js with nodemailer or a third-party email API like SendGrid, Mailgun, etc.
        });
    }
});
