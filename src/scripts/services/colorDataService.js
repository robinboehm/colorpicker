'use strict';

angular.module('robinboehm.colorpicker')
  .provider('colorpickerData', function () {

    // Defaults
    var
      serverUrl = 'http://localhost:2403/',
      resourceUrl = 'colors';

    this.serverUrl = function (serverUrlParam) {
      if (arguments.length > 0) {
        serverUrl = serverUrlParam;
      }
      return serverUrl;
    };

    this.resourceUrl = function (resourceUrlParam) {
      if (arguments.length > 0) {
        resourceUrl = resourceUrlParam;
      }
      return resourceUrl;
    };

    this.$get = function ($http) {

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
    };
  });