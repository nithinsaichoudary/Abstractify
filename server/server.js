const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = process.env.PORT || 5001;

const flaskURL = 'http://172.18.220.162:5000'

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve the base endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the File Upload API!',
    endpoints: {
      upload: 'POST /upload',
    },
  });
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload Route (Handles PDF and Text Uploads)
app.post('/upload', upload.single('file'), (req, res) => {
  const text = req.body.text;
  let responseObj = {};

  // If a file is uploaded
  if (req.file) {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // Check if the file is a PDF
    if (req.file.mimetype === 'application/pdf') {
      // Send the file to the Flask server for processing
      const form = new FormData();
      form.append('pdf_file', fs.createReadStream(filePath));

      axios.post(`${flaskURL}/get_from_pdf_file`, form, {
        headers: {
          ...form.getHeaders(),
        },
      })
      .then(response => {
        const extractedText = response.data.text; // Store the extracted text in a variable
        const wordCount = extractedText.split(' ').length;

        const summarizeEndpoint = wordCount > 350 ? '/summarize/pegasus' : '/summarize/bart';

        axios.post(`${flaskURL}${summarizeEndpoint}`, { text: extractedText })
          .then(summarizeResponse => {
        responseObj = {
          message: 'File uploaded and summarized successfully',
          summary: summarizeResponse.data.summary, // Include the summarized text in the response
        };
        res.json(responseObj);
          })
          .catch(summarizeError => {
        console.error(`Error summarizing text: ${summarizeError}`);
        res.status(500).json({ error: 'Failed to summarize text' });
          });
      })
      .catch(error => {
        console.error(`Error processing PDF: ${error}`);
        res.status(500).json({ error: 'Failed to process PDF' });
      });
    } else {
      // If it's not a PDF, return the file path directly
      responseObj = {
        message: 'File uploaded successfully',
        file: {
          originalName: req.file.originalname,
          fileName: req.file.filename,
          path: `http://localhost:${port}/uploads/${req.file.filename}`,
        },
      };
      res.json(responseObj);
    }
  } 
  
  // Handle plain text uploads (via textarea)
  else if (text) {
    const wordCount = text.split(' ').length;
    const summarizeEndpoint = wordCount > 350 ? '/summarize/pegasus' : '/summarize/bart';
    axios.post(`${flaskURL}${summarizeEndpoint}`, { text: text })
      .then(summarizeResponse => {
        responseObj = {
          message: 'Text uploaded and summarized successfully',
          summary: summarizeResponse.data.summary, // Include the summarized text in the response
        };
        res.json(responseObj);
      })
      .catch(summarizeError => {
        console.error(`Error summarizing text: ${summarizeError}`);
        res.status(500).json({ error: 'Failed to summarize text' });
      });
  } else {
    res.status(400).json({ error: 'No file or text uploaded' });
  }
});

// Chatbot Route
app.post('/chat', (req, res) => {
  const { question } = req.body;

  axios.post(`${flaskURL}/question_answering`, { question: question })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(`Error processing chat message: ${error}`);
      res.status(500).json({ error: 'Failed to process chat message' });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});