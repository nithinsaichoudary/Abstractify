const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;  // Use port 5001 to avoid conflicts

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve something at '/'
app.get('/', (req, res) => {
  res.send('Welcome to the File Upload API!');
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
  let filePath = '';

  if (req.file) {
    filePath = `http://localhost:${port}/uploads/${req.file.filename}`;
  }

  res.json({
    message: 'Upload successful',
    path: filePath,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
