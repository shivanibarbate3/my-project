const express = require("express");
const path = require('path');

const {

  getAllUsers,
  logincheck

} = require('../controllers/userController');

const {

  addSlider,
  editSlider,
  getSlider,
  authenticateToken

} = require('../controllers/sliderontroller');


const {
  getHome,getAbout,getservice,getcasestudy} = require('../controllers/frontController');

const multer = require('multer');
const jwt = require("jsonwebtoken");

const router = express.Router();

// Set up Multer (for file handling)
// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});
const upload = multer({ storage });

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
      console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
      console.log(token);
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
  
      // Verify the token (assuming you're using JWT)
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Authorization header not found' });
    }
  };
  router.get('/api/your-route', (req, res) => {
    res.status(200).json({ message: 'Route works! :)' });
    // res.send('Route works!');
  });
//   // Route to create a new user
// router.post('/', createUser);

// Route to get all users
router.get('/api/users', getAllUsers);
router.post('/api/login', logincheck);

// // Route to ADD, EDIT,LIST Slider
router.post('/api/addslider',authenticateToken,upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'banner_mobile_image', maxCount: 1 },
 
]), addSlider);
router.post('/api/editslider',authenticateToken,upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'banner_mobile_image', maxCount: 1 },
 
]), editSlider);
router.post('/api/slider',authenticateToken, getSlider);


// // Route to list home page
router.get('/api/home', getHome);
router.get('/api/about', getAbout);
router.get('/api/service', getservice);
router.get('/api/casestudy', getcasestudy);
// // Route to get a user by ID
// router.get('/:id', getUserById);

// // Route to delete a user by ID
// router.delete('/:id', deleteUser);



module.exports = router;