'use strict';

describe('A colorPickerData', function () {

  var colorpickerData, $httpBackend;
  beforeEach(module('robinboehm.colorpicker'));

  beforeEach(inject(function (_$httpBackend_, _colorpickerData_) {
    $httpBackend = _$httpBackend_;
    colorpickerData = _colorpickerData_;
  }));

  beforeEach(function () {
    var response = [
      {r: 100, g: 200, b: 50, a: 1}
    ];
    $httpBackend.whenGET(/[*]*/).respond(response);
    $httpBackend.whenPOST(/[*]*/).respond(response);
  });

  describe('Public API', function () {
    it('should provide a getColors function', function () {
      expect(colorpickerData.getColors).toBeDefined();
      expect(typeof colorpickerData.getColors).toEqual('function');
    });

    it('should provide a saveColors function', function () {
      expect(colorpickerData.saveColors).toBeDefined();
      expect(typeof colorpickerData.saveColors).toEqual('function');
    });
  });

  describe('getColors', function () {
    it('should send a httpCall to the colors resource', function () {
      var response;
      $httpBackend.expectGET(/[*]*\/colors/);
      colorpickerData.getColors()
        .then(function (responseData) {
          response = responseData;
        });
      $httpBackend.flush();

      expect(response).toBeDefined();
    });
  });

  describe('saveColors', function () {
    it('should send a httpCall to the colors resource', function () {
      var response,
        colorMock = {r: 1, g: 2, b: 3, a: 4};
      $httpBackend.expectPOST(/[*]*\/colors/, colorMock);
      colorpickerData.saveColors(colorMock);
      $httpBackend.flush();
    });
  });


});