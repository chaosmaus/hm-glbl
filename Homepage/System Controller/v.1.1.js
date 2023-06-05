/* <!-- Date Initializer */
$(document).ready(function () {
const dateSaver = () => {
    let formDates = {
        checkIn: $("#check-in").text(),
        checkout: $("#check-out").text(),
    };
    localStorage.setItem(
        "bookDates",
        `${formDates.checkIn} - ${formDates.checkout}`
    );
};

const initializeGuests = () => {
    if (localStorage.getItem('guestsNumber') === null || localStorage.getItem('guestsNumber') === '') {

        localStorage.setItem('guestsNumber', '2');
        let guests = localStorage.getItem('guestsNumber')
        $('.booking-bar_guest-text').text(`Guests: ${guests}`)
    } else {
        let guests = localStorage.getItem('guestsNumber')
        $('.booking-bar_guest-text').text(`Guests: ${guests}`)

    }
}

initializeGuests();
dateSaver();

$(".home-hero_search-button").on("click", () => {
    dateSaver();
});

$("#nav-book_button").on("click", () => {
    dateSaver();
});



/* Booking Bar Image Handler */

    if ($(window).width() < 480) {
        $('.home-hero_search-icon').attr('src', 'https://uploads-ssl.webflow.com/643e7d5bd3fee28a34417207/644d803188dce1f2897a387f_home-hero_search-icon_black.svg')
    }


    /* Booking Bar Main Controller */
    function showDatepicker() {
        let input = document.getElementById('input-id');
        let dates = localStorage.getItem('bookDates');


        let datepicker = new HotelDatepicker(input, {
            startOfWeek: 'monday',
            moveBothMonths: true,
            minNights: 1,
        });

        if (dates.length > 0 && dates != null && dates !== `Check-in - Check-out`) {
            dates = dates.split(' - ');
            datepicker.setRange(dates[0], dates[1]);
        }


        input.addEventListener('afterClose', function () {
            let val = datepicker.getValue();
            console.log(val);
            saveBookDate(val);
            if (val != '' && Boolean(val)) {
                splitData(val);
            }

            if ($(window).width() < 480) {

                if (!($('.guest-dates_blocker').hasClass('hidden'))) $('.guest-dates_blocker').addClass('hidden')
                $('.check-in_parsed').removeClass('hidden-on_mobile');
                $('.check-out_parsed').removeClass('hidden-on_mobile');
                $('.home-hero_dates-icon').removeClass('hidden-on_mobile');
                $('.check-in_parsed').css('color', '#2a2e34');
                $('.check-out_parsed').css('color', '#2a2e34');
                if (!($('.placeholder-logo').hasClass('hidden'))) $('.placeholder-logo').addClass('hidden');
                if (!($('#mobile-date-text').hasClass('hidden-on_mobile'))) {
                    $('#mobile-date-text').removeClass('hidden-on_desktop');
                    $('#mobile-date-text').addClass('hidden-on_mobile');
                }


            }
        });


        function splitData(data) {
            data = data.split(' - ');
            document.getElementById('check-in').innerText = data[0];
            document.getElementById('check-out').innerText = data[1];
        }

        function saveBookDate(date) {
            localStorage.setItem('bookDates', date)
        }

        function parseData() {
            let dates = localStorage.getItem('bookDates');
            console.log(dates);
            let totalGuest = localStorage.getItem('guestsNumber');
            console.log(totalGuest);
            if (dates.length > 0 && dates != null && dates !== `Check-in - Check-out`) {
                let days = dateRange(dates);
                console.log(days);
                let result = datepicker.getValue();
                if (result.length > 0 && result != 'undefined') {
                    splitData(dates);
                } else {
                }
            }
            if (totalGuest > 0) {
                document.getElementById('guests').innerText = totalGuest;
            }
        }
        parseData();
        function dateRange(date) {
            return date = date.split(' - ');
        }

    }

    const getDate = () => {
        if ((localStorage.getItem("bookDates") !== '')) {
            showDatepicker();
        } else {
            setTimeout(() => {
                getDate();
            }, 500)
        }
    }

    getDate();

    /* Booking Bar Initializer */

    guestCount();
    openDatepicker();


    function guestCount() {
        const minus = document.querySelector('#fewer-guests');
        const plus = document.querySelector('#more-guests');
        let guest
        if (Number(localStorage.getItem('guestsNumber')) > 0) {
            guest = localStorage.getItem('guestsNumber')
            $('.guest-block_guest-amount').text(localStorage.getItem('guestsNumber'))
            $('.booking-bar_guest-text').text(`Guests: ${localStorage.getItem('guestsNumber')}`)
        } else {
            guest = 1;
        }


        guest = Number(guest);
        minus.addEventListener('click', function () {
            if (guest > 0) {
                guest--;
                document.getElementById('guests').innerText = guest;
                document.getElementsByClassName('.guest-block_guest-amount').innerText = guest;
                $('.booking-bar_guest-text').text(`Guests: ${guest}`)
                localStorage.setItem('guestsNumber', guest);
            }
        });

        plus.addEventListener('click', function () {
            if (guest < 36) {
                guest++;
                document.getElementById('guests').innerText = guest;
                document.getElementsByClassName('.guest-block_guest-amount').innerText = guest;
                $('.booking-bar_guest-text').text(`Guests: ${guest}`)
                localStorage.setItem('guestsNumber', guest);
            }
        });
    }


    function openDatepicker() {
        const calendarOpener = document.querySelector('.calendar-opener');
        calendarOpener.addEventListener('click', function () {
            document.querySelector('#input-id').click();
        });
    }







    /* Guest Block Controller */

    $('.booking-bar_guest-text').on('click', (e) => {
        if ($('.booking-bar_guests-block').hasClass('hidden')) $('body').trigger('click')
        $('.booking-bar_guests-block').toggleClass('hidden');
        if (!($('.guest-dates_blocker').hasClass('hidden'))) $('.guest-dates_blocker').addClass('hidden')
    })

    $(document).on('click', (e) => {
        let clickedButton = $(e.target)
        if (!($('.booking-bar_guests-block').hasClass('hidden')) && !(clickedButton.is('.booking-bar_guest-text'))) {
            $('.booking-bar_guests-block').addClass('hidden');
        }
    })

    $('.booking-bar_guests-block').on('click', (e) => {
        let clickedButton = $(e.target);
        if (clickedButton.is('.guests_close-button_mask')) {
            if (!($('.booking-bar_guests-block').hasClass('hidden'))) $('.booking-bar_guests-block').addClass('hidden');
        } else {
            e.stopPropagation();
            return false;
        }

    })

    $('.booking-bar_date-text').on('click', () => {
        $('.guest-dates_blocker').removeClass('hidden')
    })

    $('.guest-dates_blocker').on('click', () => {
        $('body').trigger('click')
        if (!($('.guest-dates_blocker').hasClass('hidden'))) $('.guest-dates_blocker').addClass('hidden')

    })



    /* US Date Controller */


    function formatDate(inputDate) {
        let parts = inputDate.split('-');
        let day = parts[2];
        let monthIndex = parseInt(parts[1]) - 1;
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return day + " " + months[monthIndex];
    }
    function getAbbreviatedMonth(monthIndex) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[monthIndex - 1];
    }

    function updateUnifiedDates() {
        let checkIn = $('#check-in').text();
        let checkOut = $('#check-out').text();

        let checkInParts = checkIn.split('-');
        let checkOutParts = checkOut.split('-');

        let inMonth = parseInt(checkInParts[1]);
        let outMonth = parseInt(checkOutParts[1]);

        if (inMonth === outMonth) {
            let unifiedDates = getAbbreviatedMonth(inMonth) + ' ' + checkInParts[2] + ' - ' + checkOutParts[2];
            $('.unified-dates').text(unifiedDates);
            $('.check-in_parsed').empty();
            $('.check-out_parsed').empty();
            $('.home-hero_dates-icon').addClass('hidden');
            if (!($('.home-hero_dates-icon').hasClass('hidden-on_mobile'))) $('.home-hero_dates-icon').addClass('hidden-on_mobile')
            $('#mobile-date-text').addClass('hidden');
        } else {
            $('.unified-dates').empty();
            $('.home-hero_dates-icon').removeClass('hidden');
            $('#mobile-date-text').removeClass('hidden');
        }
    }

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                let inputDate = mutation.target.textContent;
                let formattedDate = formatDate(inputDate);

                if (mutation.target.id === 'check-in') {
                    $('.check-in_parsed').text(formattedDate);
                } else if (mutation.target.id === 'check-out') {
                    $('.check-out_parsed').text(formattedDate);
                }

                updateUnifiedDates();
            }
        });
    });

    let config = { characterData: true, childList: true, subtree: true };

    observer.observe(document.querySelector('#check-in'), config);
    observer.observe(document.querySelector('#check-out'), config);

    let bookingDates = localStorage.getItem('bookDates');
    if (bookingDates && !(bookingDates === `Check-in - Check-out`)) {
        let dates = bookingDates.split(' - ');
        if (dates.length === 2) {
            let checkIn = formatDate(dates[0]);
            let checkOut = formatDate(dates[1]);

            $('.check-in_parsed').text(checkIn);
            $('.check-out_parsed').text(checkOut);

            updateUnifiedDates();
        }
    }

});
