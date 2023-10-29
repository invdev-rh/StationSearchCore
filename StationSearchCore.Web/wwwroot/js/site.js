function filterStations(e) {
    var url = "/Stations/GetStations?filter=";


    fetch(url + e + '"')
        .then(function (response) { return response.json() })
        .then(function (data) {
            Array.from(document.getElementsByClassName('btn')).forEach(function (btn) {

                var found = false;
                
                data.nextPossibleCharacters.forEach(function (c) {
                    if (c == btn.innerHTML) {
                        found = true;
                        return;
                    }
                });

                if (found) {
                    btn.removeAttribute('disabled');
                } else {
                    btn.setAttribute('disabled', 'disabled');
                }
                document.querySelector('#searchResults > tbody').innerHTML = '';
                data.stations.forEach(function (s) {
                    var row = document.createElement('tr');
                    row.innerHTML = '<td>' + s + '</td>';
                    document.querySelector('#searchResults > tbody').appendChild(row);
                });
            });
        });
}

function changeStationNameFilterText(newfilter) {
    document.getElementById('stationName').value = newfilter;
    document.getElementById('stationName').dispatchEvent(new Event('change'))
    if (document.getElementById('stationName').value.length > 0) {
        document.querySelector('.backspaceBtn').removeAttribute('disabled');
    } else {
        document.querySelector('.backspaceBtn').setAttribute('disabled', 'disabled');
    }
}

(function () {
    document.getElementById('stationName').addEventListener('change', function (e) {
        filterStations(this.value);
    });
    document.getElementById('stationName').addEventListener('paste', function (e) {
        filterStations(this.value);
    });
    document.getElementById('stationName').addEventListener('keyup', function (e) {
        filterStations(this.value);
    });

    Array.from(document.getElementsByClassName('btn')).forEach(function (el) {
        el.addEventListener('click', function () {
            var currentText = document.getElementById('stationName').value;
            changeStationNameFilterText(currentText + this.textContent);
        });
    });

    document.querySelector('.backspaceBtn').addEventListener('click', function () {
        var currentText = document.getElementById('stationName').value;
        changeStationNameFilterText(currentText.substring(0, currentText.length - 1));
    });

    changeStationNameFilterText("");
})();
