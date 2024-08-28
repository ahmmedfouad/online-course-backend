require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Instructor = require('./models/Instructor');
const Student = require('./models/Student');
const Category = require('./models/Category');
const Team = require('./models/Team');
const Coupon = require('./models/Coupon');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;

const app = express();


// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
// Import other models



// Sync all models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });

// Routes
// register route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role !== 'instructor' && role !== 'student') {
      return res.status(400).send({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'instructor') {
      await Instructor.create({ email, password: hashedPassword });
    } else if (role === 'student') {
      await Student.create({ email, password: hashedPassword });
    }
    
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Error signing up' });
  }
});
// login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Admin first
    let user = await Admin.findOne({ where: { email } });
    if (!user) user = await Instructor.findOne({ where: { email } });
    if (!user) user = await Student.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email, role: user.constructor.name.toLowerCase() }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.constructor.name.toLowerCase() });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Error logging in' });
  }
});


app.get('/', (req, res) => {  
  res.send('landing page');
});

app.use('/api/admin', require('./routes/admin'));
app.use('/api/instructor', require('./routes/instructor'));
app.use('/api/student', require('./routes/student'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/category', require('./routes/category'));
app.use('/api/team', require('./routes/team'));
app.use('/api/coupon', require('./routes/coupon'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});