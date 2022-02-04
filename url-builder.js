function urlBuilder() {
    const UNITS = Object.freeze({
        'METRIC': 'metric',
        'imperial': 'imperial',
        'standard': 'standard'
    });

    const LANG = Object.freeze({
        'HEBREW': 'he',
        'ENGLISH': 'en'
    });

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    let parameters = null;

    function init(apiKey) {
        parameters = {
            appid: apiKey
        };
    }

    function chooseUnits(unit) {
        parameters['units'] = unit;
    }

    function addCoords(lat, lon) {
        parameters['lat'] = lat;
        parameters['lon'] = lon;
    }

    function chooseCity(city) {
        parameters['q'] = city;
    }

    function finish() {
        const keyvalues = Object.entries(parameters) // [ ['appid', 'asd'], ['units', 'metric']  ]
        const keyaluesStr = keyvalues.map(kv => kv[0] + '=' + kv[1]); // ['appid=asd', 'units='metric']
        const str = keyaluesStr.join('&') // appid=asd&units='metric

        parameters = null;

        return baseUrl + '?' + str;
    }


    return {
        init,
        chooseUnits,
        chooseCity,
        addCoords,
        finish,
        UNITS,
        LANG
    }
}


// https://api.openweathermap.org/data/2.5?units=metric&appid=asdasd&q=jerusalem