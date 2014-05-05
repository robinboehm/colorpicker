(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/colorPicker.html',
    '<input type="range" min="0" max="255" step="1" ng-model="r"><input type="range" min="0" max="255" step="1" ng-model="g"><input type="range" min="0" max="255" step="1" ng-model="b"><input type="range" min="0" max="1.0" step="0.01" ng-model="a"><div style="width: 400px;\n' +
    '            height: 100px;\n' +
    '            background-color: rgba({{r}},{{g}},{{b}},{{a}});"></div>');
}]);
})();
