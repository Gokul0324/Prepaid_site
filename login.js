document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var mobile = document.getElementById('mobile').value.trim();
    var email = document.getElementById('email').value.trim();
  
    var mobilePattern = /^[6-9]\d{9}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    console.log("Entered Mobile:", mobile);
    console.log("Entered Email:", email);
  
    if (!mobilePattern.test(mobile)) {
      alert('Invalid mobile number format. It should start with 6-9 and have 10 digits.');
      return;
    }
    if (!emailPattern.test(email)) {
      alert('Invalid email format.');
      return;
    }
  
    fetch('users.json')
      .then(response => response.json())
      .then(users => {
        var validUser = users.find(user => user.mobile === mobile && user.email === email);
  
        if (validUser) {
          alert('Login successful!');
        } else {
          alert('Invalid credentials. Please check your mobile number and email.');
        }
      })
      .catch(error => {
        console.error('Error loading user data:', error);
        alert('Error loading user data. Ensure the JSON file is accessible via a live server.');
      });
  });
  