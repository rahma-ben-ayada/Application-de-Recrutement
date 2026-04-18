require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT || 5000}/api/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (user) {
          // Update user if they exist with new Google info
          if (!user.googleId) {
            user.googleId = profile.id;
          }
          if (!user.photo && profile.photos[0]?.value) {
            user.photo = profile.photos[0].value;
          }
          user.lastLogin = new Date();
          await user.save();
          console.log(`Google Auth: Existing user logged in - ${user.email}`);
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          nom: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          photo: profile.photos[0]?.value || '',
          password: Math.random().toString(36).slice(-8), // Random password for Google auth
          role: 'candidat', // Default role for Google auth users
          status: 'pending', // Pending status requires admin approval
          isVerified: true,
        });

        console.log(`Google Auth: New pending user created - ${user.email}`);
        return done(null, user);
      } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
