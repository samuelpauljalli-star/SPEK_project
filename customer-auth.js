// Customer Authentication Helper
// Import this in your main index.html for customer authentication during checkout

import { auth, provider, signInWithPopup, signOut } from './firebase-config.js';

// Global variable to store current user
let currentUser = null;

// Initialize auth state listener
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        console.log('User is signed in:', user.email);
        // Update UI to show logged in state
        updateUIForLoggedInUser(user);
    } else {
        currentUser = null;
        console.log('User is signed out');
        // Update UI to show logged out state
        updateUIForLoggedOutUser();
    }
});

// Function to sign in with Google
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        currentUser = user;

        // Save user to localStorage for history tracking
        saveUserToHistory(user);

        return {
            success: true,
            user: {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }
        };
    } catch (error) {
        console.error('Sign-in error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Function to sign out
export async function signOutUser() {
    try {
        await signOut(auth);
        currentUser = null;
        return { success: true };
    } catch (error) {
        console.error('Sign-out error:', error);
        return { success: false, error: error.message };
    }
}

// Check if user is logged in
export function isUserLoggedIn() {
    return currentUser !== null;
}

// Get current user details
export function getCurrentUser() {
    return currentUser;
}

// Save user to history (for admin dashboard)
function saveUserToHistory(user) {
    try {
        const userHistory = JSON.parse(localStorage.getItem('wilson-user-history')) || [];

        // Check if user already exists
        const existingUser = userHistory.find(u => u.email === user.email);

        if (!existingUser) {
            const userData = {
                name: user.displayName || 'Guest',
                email: user.email,
                mobile: 'N/A', // Can be updated later
                lastLogin: new Date().toISOString()
            };
            userHistory.push(userData);
            localStorage.setItem('wilson-user-history', JSON.stringify(userHistory));
        } else {
            // Update last login
            existingUser.lastLogin = new Date().toISOString();
            localStorage.setItem('wilson-user-history', JSON.stringify(userHistory));
        }
    } catch (error) {
        console.error('Error saving user to history:', error);
    }
}

// Update UI when user is logged in
function updateUIForLoggedInUser(user) {
    // Update any UI elements that show login/logout buttons
    const loginButtons = document.querySelectorAll('.login-btn');
    const userNameElements = document.querySelectorAll('.user-name');

    loginButtons.forEach(btn => {
        btn.textContent = 'Sign Out';
        btn.onclick = () => signOutUser();
    });

    userNameElements.forEach(element => {
        element.textContent = user.displayName || user.email;
    });
}

// Update UI when user is logged out
function updateUIForLoggedOutUser() {
    const loginButtons = document.querySelectorAll('.login-btn');
    const userNameElements = document.querySelectorAll('.user-name');

    loginButtons.forEach(btn => {
        btn.textContent = 'Sign In';
        btn.onclick = () => signInWithGoogle();
    });

    userNameElements.forEach(element => {
        element.textContent = '';
    });
}

// Export all functions
export default {
    signInWithGoogle,
    signOutUser,
    isUserLoggedIn,
    getCurrentUser
};
