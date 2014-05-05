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
    '            background-color: rgba({{r}},{{g}},{{b}},{{a}});"></div><button ng-click="save(r,g,b,a)">Save Color!</button><style>div.color {\n' +
    '    float: left;\n' +
    '    list-style-type: none;\n' +
    '    width: 50px;\n' +
    '    height: 50px;\n' +
    '  }</style><p><h3>Saved Colors</h3><div ng-repeat="color in colors" class="color" style="background-color: rgba({{color.r}},{{color.g}},{{color.b}},{{color.a}});" ng-click="setColor(color)"></div></p>');
}]);
})();
