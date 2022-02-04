function City(weatherData) {
    Object.assign(this, weatherData);
    this.fetchTimestamp = new Date();
}