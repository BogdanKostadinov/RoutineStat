var rangeTest = flatpickr(document.querySelector('.bedTime'), {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",

    //TODO: disable 2 days ago, enable 1 day ahead
    //disable: [
    //    function (date) {
    //        // disable every multiple of 8
    //        return !(date.getDate() % 8);
    //    }
    //],
    altInput: true,
    enableTime: true,
    onChange: function (selectedDates, dateStr, instance) {
        console.log('date: ', dateStr);
    }
});

$(".clear_button_bed").click(function () {
    bedTime.clear();
})

$('.btn-number').click(function (e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function () {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//Change dropdown value
$(".dropdown-menu li a").click(function () {

    $(this).parents(".dropdown").find('.selection').text($(this).text());
    $(this).parents(".dropdown").find('.selection').val($(this).text());

});

$('.add-activity').click(function (e) {
    e.preventDefault();

    let dropdownOption = $('.selection');

    var selectedText = $(dropdownOption).text();
    var node = document.createElement("LI");

    let hoursSpent = document.getElementById("hoursSpent");
    let hoursText = $(hoursSpent).val();

    var btnDelete = document.createElement("input");
    var dash = document.createElement("a");

    var textnode = document.createTextNode(selectedText);
    var hoursNode = document.createTextNode(hoursText);

    if (textnode.textContent == "Please select from the options below") {
        alert("Invalid option");
    }
    else
    {
        dash.innerText = " - "; 
       
        btnDelete.type = "button";
        btnDelete.name = "add";
        btnDelete.value = "x";
        btnDelete.className = "btn btn-danger btn-xs";
        btnDelete.style = "margin-left: 15px;";

        $(btnDelete).click(function () {
            e.preventDefault();
            node.remove();
        });
        node.appendChild(textnode);
        node.appendChild(dash);
        node.appendChild(hoursNode);
        node.appendChild(btnDelete);
        document.getElementById("myUL").appendChild(node);
    }

})
