function validateAndRedirect() {
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
