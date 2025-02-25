// Check if user is logged in
function isUserLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Update the account dropdown menu
function updateDropdown() {
    const dropdownMenu = document.querySelector('[aria-labelledby="profileDropdown"]');
    
    if (isUserLoggedIn()) {
        // Show My Account and Logout when logged in
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="UserProfile.html">
                <i class="fas fa-user fa-sm me-2"></i>My Account</a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="logout()">
                <i class="fas fa-sign-out-alt fa-sm me-2"></i>Logout</a>
            </li>
        `;
    } else {
        // Show only Login when logged out
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="UserLogin.html">
                <i class="fas fa-sign-in-alt fa-sm me-2"></i>Login</a>
            </li>
        `;
    }
}

// Handle login
function login() {
    sessionStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'UserProfile.html';
}

// Handle logout
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'plans.html';
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDropdown();
});