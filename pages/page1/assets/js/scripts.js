document.addEventListener('DOMContentLoaded', () => {
const seats = document.querySelectorAll('.seat:not(.reserved)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedSeatsText = document.getElementById('selected-seats');
const movieSelect = document.getElementById('movie');
const movieTime = document.getElementById('movieTime');
const movieDateInput = document.getElementById('movieDate');
const bookNowBtn = document.getElementById('bookNow');
const ticketPrice = 400;

const paymentModal = document.getElementById('paymentModal');
const confirmPaymentBtn = document.getElementById('confirmPayment');
const closeModalBtn = document.getElementById('closeModal');

let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || {};
let selectedSeats = [];

function getReservationKey() {
    const selectedMovie = movieSelect.value;
    const selectedDate = movieDateInput.value;
    const selectedTime = movieTime.value;

    if (!selectedMovie || !selectedDate || !selectedTime) {
        return null;
    }

    return `${selectedMovie}|${selectedDate}|${selectedTime}`;
}

function updateSelectedSeats() {
    selectedSeats = [...document.querySelectorAll('.seat.selected')];

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;

    const selectedSeatLabels = selectedSeats.map(seat => seat.getAttribute('data-label'));
    selectedSeatsText.innerText = `Selected seats: ${selectedSeatLabels.length > 0 ? selectedSeatLabels.join(', ') : 'None'}`;
}

function updateSeatAvailability() {
    seats.forEach(seat => seat.classList.remove('selected', 'reserved'));

    const key = getReservationKey();
    if (key && bookedSeats[key]) {
        bookedSeats[key].forEach(index => {
            if (seats[index]) {
                seats[index].classList.add('reserved');
            }
        });
    }
    updateSelectedSeats();
}

function saveReservationsToStorage() {
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
}

function loadReservationsFromStorage() {
    Object.keys(bookedSeats).forEach(key => {
        if (bookedSeats[key]) {
            bookedSeats[key].forEach(index => {
                if (seats[index]) {
                    seats[index].classList.add('reserved');
                }
            });
        }
    });
}

seats.forEach((seat) => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('reserved')) {
            seat.classList.toggle('selected');
            updateSelectedSeats();
        }
    });
});

movieSelect.addEventListener('change', updateSeatAvailability);
movieDateInput.addEventListener('change', updateSeatAvailability);
movieTime.addEventListener('change', updateSeatAvailability);

bookNowBtn.addEventListener('click', () => {
    if (!movieSelect.value || !movieDateInput.value || !movieTime.value) {
        alert('Please select a movie, date, and time before booking.');
        return;
    }
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat before booking.');
        return;
    }
    paymentModal.style.display = 'block';
});

confirmPaymentBtn.addEventListener('click', () => {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method to proceed.');
        return;
    }

    const key = getReservationKey();
    if (!key) return;

    if (!bookedSeats[key]) {
        bookedSeats[key] = [];
    }

    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('reserved');
        let seatIndex = [...seats].indexOf(seat);
        if (!bookedSeats[key].includes(seatIndex)) {
            bookedSeats[key].push(seatIndex);
        }
    });

    saveReservationsToStorage();

    alert(`Payment successful! You booked ${selectedSeats.length} seats for "${movieSelect.value}" on ${movieDateInput.value} at ${movieTime.value} using ${selectedPayment.value}.`);

    selectedSeats = [];
    updateSelectedSeats();
    paymentModal.style.display = 'none';
});

closeModalBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});


const seatingSections = document.querySelectorAll('.seating-section');
let rowLetters = ['A', 'B', 'C', 'D', 'E'];

seatingSections.forEach(section => {
    const rows = section.querySelectorAll('.row');

    rows.forEach((row, rowIndex) => {
        const seatsInRow = row.querySelectorAll('.seat');
        seatsInRow.forEach((seat, seatIndex) => {
            let seatNumber;

            if (section.classList.contains('left')) {
                seatNumber = rowLetters[rowIndex] + (seatIndex + 1);
            } else if (section.classList.contains('center')) {
                seatNumber = rowLetters[rowIndex] + (seatIndex + 4);
            } else if (section.classList.contains('right')) {
                seatNumber = rowLetters[rowIndex] + (seatIndex + 9);
            }

            seat.setAttribute('data-label', seatNumber);
        });
    });
});

seats.forEach(seat => seat.classList.remove('reserved'));
});

logoutBtn.addEventListener("click", function () {
localStorage.removeItem("userLoggedIn");
alert("You have logged out.");
updateUI();
});