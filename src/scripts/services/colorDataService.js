'use strict';

angular.module('robinboehm.colorpicker')
  .factory('colorpickerData', function ($http) {

    var
      serverUrl = 'http://localhost:2403/',
      resourceUrl = 'colors';

    // Private Service Impl
    function getColors() {
      return $http.get(serverUrl + resourceUrl);
    }

    function saveColors(color) {
      return $http.post(serverUrl + resourceUrl, color);
    }

    // Public API
    return {
      getColors: getColors,
      saveColors: saveColors
    };
  });