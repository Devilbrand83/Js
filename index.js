const axios = require('axios');
const fs = require('fs');

// Read files
const convo = fs.readFileSync('convo.txt', 'utf-8'); // Message content
const timeInterval = parseInt(fs.readFileSync('time.txt', 'utf-8').trim()); // Time interval in ms
const senderName = fs.readFileSync('hateraname.txt', 'utf-8').trim(); // Sender's name or ID
const apiUrl = fs.readFileSync('file.txt', 'utf-8').trim(); // Target API URL

// Define cookies (modify as per your requirement)
const cookies = 'session_id=xyz; auth_token=abc'; // Replace with actual cookies

// Message sending function
async function sendMessage() {
  try {
    const response = await axios.post(apiUrl, {
      message: convo,
      senderId: senderName,
    }, {
      headers: {
        'Cookie': cookies, // Pass the cookies in the request header
        'Content-Type': 'application/json'
      }
    });

    console.log(`Message sent: ${response.data}`);
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
  }
}

// Send messages continuously based on time interval
function startSending() {
  setInterval(sendMessage, timeInterval); // Use time from time.txt
}

startSending();
