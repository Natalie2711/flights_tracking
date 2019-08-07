document.addEventListener('DOMContentLoaded', () => {

var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit('get update')
});

socket.on('update table', flights => {
    var table = document.querySelector('table');
    var rowsCount = table.rows.length;
    for (var i = 1; i < rowsCount; i++) {
        table.deleteRow(1);
    }
    var rowIndex = 1;
    for (flight of flights) {
        var row = table.insertRow(rowIndex);
        row.insertCell(0).innerHTML(flight.passenger_id);
        row.insertCell(1).innerHTML(flight.passenger_name);
        row.insertCell(2).innerHTML(flight.flight_code);
        row.insertCell(3).innerHTML(flight.Origin);
        row.insertCell(4).innerHTML(flight.Destination);
        row.insertCell(5).innerHTML(flight.time_landing);
        row.insertCell(6).innerHTML(flight.Status);

    }
});
})


