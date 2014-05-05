angular.module('robinboehm.colorpicker', []);
'use strict';
angular.module('robinboehm.colorpicker').directive('colorpicker', [
  'colorpickerData',
  function (colorpickerData) {
    return {
      restrict: 'E',
      templateUrl: 'views/colorPicker.html',
      scope: {
        r: '@initR',
        g: '@initG',
        b: '@initB',
        a: '@initA'
      },
      link: function (scope) {
        function getColorsFromServer() {
          return colorpickerData.getColors().then(function (response) {
            scope.colors = response.data;
          });
        }
        scope.save = function (r, g, b, a) {
          var colorObject = {
              r: r,
              g: g,
              b: b,
              a: a
            };
          colorpickerData.saveColors(colorObject).then(getColorsFromServer);
        };
        scope.setColor = function (color) {
          scope.r = color.r;
          scope.g = color.g;
          scope.b = color.b;
          scope.a = color.a;
        };
        // Init
        getColorsFromServer();
      }
    };
  }
]);
'use strict';
angular.module('robinboehm.colorpicker').factory('colorpickerData', [
  '$http',
  function ($http) {
    var serverUrl = 'http://localhost:2403/', resourceUrl = 'colors';
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
  }
]);