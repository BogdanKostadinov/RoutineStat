let columnNumber = 0;
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

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
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    var tdName = document.createElement("td");
    var tdTime = document.createElement("td");
    var tdButton = document.createElement("td");
    var trCount = document.createElement("a");
    
    let hoursSpent = document.getElementById("hoursSpent");
    let hoursText = $(hoursSpent).val();

    var btnDelete = document.createElement("input");

    var textnode = document.createTextNode(selectedText);
    var hoursNode = document.createTextNode(hoursText);

    if (textnode.textContent == "Please select from the options below") {
        alert("Invalid option");
    }
    else {

        btnDelete.type = "button";
        btnDelete.name = "add";
        btnDelete.value = "x";
        btnDelete.className = "btn btn-danger btn-xs";

        columnNumber++;

        trCount.innerHTML = columnNumber;
        th.appendChild(trCount);
        tdName.appendChild(textnode);
        tdTime.appendChild(hoursNode);
        tdButton.appendChild(btnDelete);

        let newRow = document.getElementById("myUL");
        
        newRow.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        tr.appendChild(tdButton);

        $(btnDelete).click(function () {
            e.preventDefault();
            let tableRow = document.querySelectorAll('#myTable tbody tr').length;

            tr.remove();

            for (let i = 1; i < tableRow; i++) {

                $("#myUL tr").children("th")[i - 1].innerText = i;
                columnNumber = i;
            }

            if ($('#myUL tr').length == 0) {
                columnNumber = 0;
            }
        });

    }

})

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ]);

    var options = {
        title: 'My Daily Activities',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}

