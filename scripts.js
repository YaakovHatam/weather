const builder = urlBuilder();

const getData = async props => {
    if (CITIES_WEATHER_CACHE[props.city]) return CITIES_WEATHER_CACHE[props.city];

    builder.init('1e8ffdb64b7d4d8dbdd4bf3a700bdeb0');
    let cacheKey = '';
    if (props.city) {
        builder.chooseCity(props.city);
        cacheKey = props.city;
    } else {
        builder.addCoords(props.latitude, props.longitude);
        cacheKey = props.latitude + ',' + props.longitude;
    }
    builder.chooseUnits(builder.UNITS.METRIC);
    const url = builder.finish();
    return fetch(url).then(res => res.json()).then(res => (CITIES_WEATHER_CACHE[cacheKey] = new City(res), CITIES_WEATHER_CACHE[cacheKey]));
}

const cardsContainer = document.getElementById('cards');

const makeCard = data => {
    const card = document.createElement('div');
    card.innerHTML = JSON.stringify(data);
    return card;
}

document.getElementById('add').addEventListener('submit', function (e) {
    e.preventDefault();
    getData({
        city: this['city'].value
    }).then(data => {
        cardsContainer.appendChild(makeCard(data));
    })

});

document.getElementById('location').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        getData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }).then(data => {
            cardsContainer.appendChild(makeCard(data));
        })

    })
})
