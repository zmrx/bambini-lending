const yaMapAddressSearchTaker = ()=>{// получаем название банка для его поиска
    let companyName = 'Bambini-club';
	let address = 'ул. Державина, 11';
    return address + ' ' + companyName;
}

function init() {
    ymaps.geolocation.get().then(
    	function (res) {
    		var mapContainer = $('#map'),
        	bounds = res.geoObjects.get(0).properties.get('boundedBy'),

        	// Рассчитываем видимую область для текущей положения пользователя.
        	mapState = ymaps.util.bounds.getCenterAndZoom(
            	bounds,
            	[mapContainer.width(), mapContainer.height()]
        	);
    		createMap(mapState);

		}, function (e) {// Если местоположение невозможно получить, то просто создаем карту.
        	createMap({
	            center: [55.741951, 37.629001],
	            zoom: 5,
	            controls: []
	        });
	});
	function createMap (state) {
        map = new ymaps.Map('map', state);

        map.controls.remove('searchControl');
        map.controls.remove('geolocationControl');
        map.controls.remove('typeSelector');
        map.controls.remove('trafficControl');
        map.controls.remove('fullscreenControl');
        map.controls.remove('rulerControl');

	    // Создадим экземпляр элемента управления «поиск по карте»
	    // с установленной опцией провайдера данных для поиска по организациям.
	    var searchControl = new ymaps.control.SearchControl({
	        options: {
	            float: 'right',
	            size: 'small',
	            provider: 'yandex#search',
	            strictBounds: true
	        }
	    });

	    ymaps.geolocation.get({
	        provider: 'yandex'
	    }).then(function (result) {
	        var loc = result.geoObjects.get(0).getLocalities();
	        // console.log(loc);

		    map.controls.add(searchControl);
		    // Программно выполним поиск определённых банков в текущей
		    // прямоугольной области карты.

		    //задаем поисковый запрос
		    yaMapAddressSearch = yaMapAddressSearchTaker();
		    searchControl.search('!\"' + loc + ' ' + yaMapAddressSearch + '\"');

		});
    }
}
document.addEventListener('DOMContentLoaded',()=>{
	ymaps.ready(init);
})
