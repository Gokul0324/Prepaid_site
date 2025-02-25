function validateAndRedirect() {
    document.addEventListener('DOMContentLoaded', function() {
        const mobileForm = document.getElementById('mobileForm');
        const mobileInput = document.getElementById('mobile');
        const mobileError = document.getElementById('mobileError');
        const submitBtn = document.getElementById('mobileSubmitBtn');
        const buttonText = document.getElementById('buttonText');
        const buttonSpinner = document.getElementById('buttonSpinner');
    
        let mobiCommNumbers = null;
    
        // Fetch MobiComm numbers from JSON file
        async function fetchMobiCommNumbers() {
            try {
                const response = await fetch('../mobicomm-numbers.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch numbers database');
                }
                const data = await response.json();
                mobiCommNumbers = data.mobiCommNumbers;
            } catch (error) {
                console.error('Error loading numbers database:', error);
            }
        }
    
        // Function to validate mobile number format
        function isValidMobileFormat(number) {
            // Check if number starts with 6, 7, 8, or 9 and is exactly 10 digits
            const mobileRegex = /^[6-9]\d{9}$/;
            return mobileRegex.test(number);
        }
    
        // Function to check if number exists in MobiComm database
        function isMobiCommNumber(number) {
            if (!mobiCommNumbers) return false;
            return mobiCommNumbers.prepaid.includes(number) || 
                   mobiCommNumbers.postpaid.includes(number);
        }
    
        // Function to show error message
        function showError(message) {
            mobileError.textContent = message;
            mobileError.style.display = 'block';
            mobileInput.classList.add('is-invalid');
        }
    
        // Function to clear error message
        function clearError() {
            mobileError.style.display = 'none';
            mobileInput.classList.remove('is-invalid');
        }
    
        // Function to show loading state
        function setLoadingState(loading) {
            if (loading) {
                buttonText.style.display = 'none';
                buttonSpinner.classList.remove('d-none');
                submitBtn.disabled = true;
            } else {
                buttonText.style.display = 'block';
                buttonSpinner.classList.add('d-none');
                submitBtn.disabled = false;
            }
        }
    
        // Handle form submission
        mobileForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearError();
            
            const mobileNumber = mobileInput.value.trim();
    
            if (!isValidMobileFormat(mobileNumber)) {
                showError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
                return;
            }
    
            setLoadingState(true);
    
            // Ensure numbers database is loaded
            if (!mobiCommNumbers) {
                await fetchMobiCommNumbers();
            }
    
            setTimeout(() => {
                if (isMobiCommNumber(mobileNumber)) {
                    // Valid MobiComm number, redirect to Plans page
                    window.location.href = 'plans.html';
                } else {
                    showError('This number is not registered with MobiComm');
                    setLoadingState(false);
                }
            }, 1000); // 1 second delay to simulate API check
        });
    
        // Real-time validation as user types
        mobileInput.addEventListener('input', function() {
            const number = this.value.trim();
            
            // Clear error if input is empty
            if (!number) {
                clearError();
                return;
            }
    
            // Show error if number format is invalid
            if (number.length === 10 && !isValidMobileFormat(number)) {
                showError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
            } else {
                clearError();
            }
        });
    
        // Load numbers database when page loads
        fetchMobiCommNumbers();
    });
    let mobileNumber = document.getElementById("mobile").value;
    let button = document.getElementById("loadBtn");
    let regex = /^[6-9]\d{9}$/;
    
    if (regex.test(mobileNumber)) {
        button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
        button.disabled = true;
        setTimeout(() => {
            window.location.href = "plans.html";
        }, 1000);
        
    } else {
        let alertContainer = document.getElementById("alertContainer");

        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger alert-dismissible fade show mt-3";
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
            <strong>Error!</strong> Please enter a valid 10-digit mobile number.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        alertContainer.innerHTML = "";
        alertContainer.appendChild(alertDiv);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const offcanvasElement = document.getElementById("offcanvasExample");

    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
        document.body.classList.add("offcanvas-open");
    });

    offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
        document.body.classList.remove("offcanvas-open");
    });
});
