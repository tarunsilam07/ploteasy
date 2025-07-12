import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  phone: {
    type: Number,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profileImageURL: {
    type: String,
    default: "/profile.webp"
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  hashedEmail: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
