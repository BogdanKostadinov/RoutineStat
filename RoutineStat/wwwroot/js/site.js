var fp = flatpickr(document.querySelector('#flatpickr'), {
    //altFormat: "F j, Y",
    altInput: true,
    //inline: true,
    dateFormat: "F, d Y H:i",
    enableTime: true,
    //mode: "multiple",
    onChange: function (selectedDates, dateStr, instance) {
        console.log('date: ', dateStr);
    }
});


$(".clear_button").click(function () {
    fp.clear();
})
