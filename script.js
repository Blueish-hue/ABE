document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Simulate login process (replace with actual authentication logic)
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Example credentials for demonstration purposes
    if (username === 'admin' && password === '007') {
        // Successful login
        document.getElementById('login-message').innerText = 'Welcome';
        // Redirect or perform other actions after login
        setTimeout(function() {
            window.location.href = 'admin-panel.html'; // Redirect to admin panel
        }, 1200); // 1.2 seconds delay before redirecting
    } else {
        // Failed login
        document.getElementById('login-message').innerText = 'Invalid username or password. Please try again.';
    }
});
