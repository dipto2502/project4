// E:\Restaurant\res_landing\backend\models\User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
    trim: true,   // Removes leading/trailing whitespace
    minlength: 3  // Minimum length for username
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
    trim: true,
    lowercase: true, // Stores email in lowercase
    // Basic email format validation using regex
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum length for password
  },
  role: {
    type: String,
    enum: ['customer', 'admin'], // Defines allowed roles
    default: 'customer' // Default role for new users if not specified
  }
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// Middleware to hash the password before saving the user document
// 'pre' hook runs before the 'save' operation
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt (random string) for hashing
  const salt = await bcrypt.genSalt(10); // 10 rounds is a good balance for security and performance
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Proceed to the next middleware or save operation
});

// Method to compare an entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Use bcrypt.compare to compare the plain text password with the hashed one
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', userSchema);