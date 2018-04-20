ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [59.938631, 30.323055],
      zoom: 16,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.png',
      iconImageSize: [60, 53],
      iconImageOffset: [-30, -53]
    });
  myMap.geoObjects
    .add(myPlacemark)
});
