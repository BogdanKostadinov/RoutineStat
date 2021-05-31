var bedTime = flatpickr(document.querySelector('.bedTime'), {
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

var wakeTime = flatpickr(document.querySelector('.wakeTime'), {
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

$(".clear_button_bed").click(function () {
    bedTime.clear();
})

$(".clear_button_wake").click(function () {
    wakeTime.clear();
})
