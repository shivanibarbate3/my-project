require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const cors = require("cors");
// const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Simple request logger to help debug API requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/", authRoutes);
app.use("/", uploadRoutes);

// Serve uploads directory so locally-stored fallback files are accessible at /uploads/<name>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, tlsCAFile: `global-bundle.pem`})
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "shivani_cms"   // Explicitly connect to your DB
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/testing', (req, res) => {
  res.send(`API is running...on http://localhost:${PORT}`);
});
// Basic error handler — logs error and returns JSON to client
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(500).json({ status: false, error: err && err.message ? err.message : 'Server error' });
});
// app.listen(port, () => {
//   console.log(`Server running onyy port: ${port}`);
// });