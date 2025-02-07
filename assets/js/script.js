document.querySelectorAll('.poster').forEach(poster => {
const video = poster.querySelector('.trailer');

poster.addEventListener('mouseenter', () => {
    video.muted = false;
    video.play();
});

poster.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    video.muted = true;
});
});

document.addEventListener("DOMContentLoaded", function () {
const buyNowBtn = document.getElementById("buyNowBtn");
const authModal = document.getElementById("authModal");
const closeModal = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const authTitle = document.getElementById("authTitle");
const buyTicketsNavLink = document.querySelector(".menu a[href='./pages/page1/index.html']");

authModal.style.display = "none";

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function isLoggedIn() {
    return localStorage.getItem("userLoggedIn") === "true";
}

function updateUI() {
    if (isLoggedIn()) {
        logoutBtn.style.display = "block";
        buyNowBtn.innerText = "Proceed to Buy Tickets";
    } else {
        logoutBtn.style.display = "none";
        buyNowBtn.innerText = "Buy Tickets";
    }
}

buyNowBtn.addEventListener("click", function () {
    if (!isLoggedIn()) {
        authModal.style.display = "block";
    } else {
        window.location.href = "./pages/page1/index.html";
    }
});

buyTicketsNavLink.addEventListener("click", function (event) {
    if (!isLoggedIn()) {
        event.preventDefault();
        alert("Please login first.");
        authModal.style.display = "block";
    }
});

closeModal.addEventListener("click", function () {
    authModal.style.display = "none";
});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    let users = getUsers();

    if (users.some(user => user.email === email)) {
        alert("Email already registered! Please log in.");
        return;
    }

    users.push({ email, password });
    saveUsers(users);

    alert("Sign Up successful! You can now login.");
    signupForm.reset();
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    authTitle.innerText = "Login";
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = getUsers();

    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        alert("We couldn't find an account with that email. Please sign up first.");
        return;
    }

    localStorage.setItem("userLoggedIn", "true");
    alert("Login successful. Buy tickets now!");
    authModal.style.display = "none";
    updateUI();
    window.location.href = "./pages/page1/index.html";
});

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("userLoggedIn");
    alert("You have logged out.");
    updateUI();
});

loginTab.addEventListener("click", function () {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    authTitle.innerText = "Login";
});

signupTab.addEventListener("click", function () {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    authTitle.innerText = "Sign Up";
});

updateUI();
});