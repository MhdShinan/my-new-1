const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

// Create the Express app
const app = express();

// Serve static files from the 'css', 'scripts', and 'images' directories
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = {
  'admin@example.com': '123'
};

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email] === password) {
    res.sendFile(path.join(__dirname, 'adminpanel.html'));
  } else {
    res.send('<script>alert("Invalid email or password!"); window.location.href="/";</script>');
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Handle  email form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'm.mohamed.shinan@gmail.com',
      pass: 'bxey fkyf wztb dhmd' 
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'm.mohamed.shinan@gmail.com',
    subject: `Message from ${name}`,
    text: message,
    replyTo: email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});



// Start server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create an HTTP server and listen on port 80
const server = http.createServer(app);
server.listen(80, () => {
  console.log('Server also running on port 80');
});
