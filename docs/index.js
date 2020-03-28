ymaps.ready(function () {
    let points = addresses.map(address => {
        const {point} = address;
        return point.split(', ');
    });

    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        /**
         * Creating a clusterer by calling a constructor function.
         * A list of all options is available in the documentation.
         * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
         */
        clusterer = new ymaps.Clusterer({
            /**
             * Only cluster styles can be specified via the clusterer;
             * for placemark styles, each placemark must be set separately.
             * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
            preset: 'islands#invertedVioletClusterIcons',
            /**
             * Setting to "true" if we want to cluster only points with the same coordinates.
             */
            groupByCoordinates: false,
            /**
             * Setting cluster options in the clusterer with the "cluster" prefix.
             * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        }),
        /**
         * The function returns an object containing the placemark data.
         * The clusterCaption data field will appear in the list of geo objects in the cluster balloon.
         * The balloonContentBody field is the data source for the balloon content.
         * Both fields support HTML markup.
         * For a list of data fields that are used by the standard content layouts for
         * geo objects' placemark icons and balloons, see the documentation.
         * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
        getPointData = function (index) {
            return {
                balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.com">Your link can be here</a></b></font>',
                balloonContentBody: '<p>Your name: <input name="login"></p><p>The phone in the format 2xxx-xxx:  <input></p><p><input type="submit" value="Send"></p>',
                balloonContentFooter: '<font size=1>Information provided by: placemark </font> balloon <strong> ' + index + '</strong>',
                clusterCaption: 'placemark <strong>' + index + '</strong>'
            };
        },
        /**
         * The function returns an object containing the placemark options.
         * All options that are supported by the geo objects can be found in the documentation.
         * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
        getPointOptions = function () {
            return {
                preset: 'islands#violetIcon'
            };
        },
        geoObjects = [];

    /**
     * Data is passed to the placemark constructor as the second parameter, and options are third.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
    for(var i = 0, len = points.length; i < len; i++) {
        geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
    }

    /**
     * You can change clusterer options after creation.
     */
    clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: true
    });

    /**
     * You can add a JavaScript array of placemarks (not a geo collection) or a single placemark to the clusterer.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    /**
     * Positioning the map so that all objects become visible.
     */

    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
    });
});
