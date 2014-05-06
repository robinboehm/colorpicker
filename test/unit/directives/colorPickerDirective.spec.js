'use strict';


describe('A colorpicker', function () {
  var $rootScope, $compile, $httpBackend;

  beforeEach(module('robinboehm.colorpicker'));

  beforeEach(inject(function (_$q_, _$rootScope_, _$compile_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function () {
    var response = [
      {r: 100, g: 200, b: 50, a: 1}
    ];
    $httpBackend.whenGET(/[*]*/).respond(response);
    $httpBackend.whenPOST(/[*]*/).respond(response);
  });

  it('should render a colorpicker', function () {
    var element = $compile('<colorpicker></colorpicker>')($rootScope);
    $rootScope.$apply();

    expect(element.find('input').length).toBe(4);
    expect(element.find('div').length).toBe(1);
  });


  describe('save-feature', function () {

    it('should render a save button', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      var saveButton = element.find('button');
      expect(saveButton.length).toBe(1);
      expect(saveButton.text()).toBe('Save Color!');
    });

    it('should be defined on the scope', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      expect(element.isolateScope().save).toBeDefined();
      expect(typeof element.isolateScope().save).toBe('function');
    });

    it('should called on save-button click', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      var saveButton = element.find('button')[0];
      var innerScope = element.isolateScope();

      spyOn(innerScope, 'save');

      expect(element.isolateScope().save).not.toHaveBeenCalled();
      saveButton.click();
      expect(element.isolateScope().save).toHaveBeenCalled();
    });

    it('should call the save function on save-button click', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      var saveButton = element.find('button')[0];
      var innerScope = element.isolateScope();

      spyOn(innerScope, 'save');

      expect(element.isolateScope().save).not.toHaveBeenCalled();
      saveButton.click();
      expect(element.isolateScope().save).toHaveBeenCalled();
    });

    it('should call the save function on save-button click', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      element.isolateScope().save();
      // Execute all queued http requests
      $httpBackend.expectPOST('http://localhost:2403/colors');
      $httpBackend.flush();
    });
  });

  describe('colorList-feature', function () {

    it('should render a section', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      expect(element.find('section').length).toBe(1);
      expect(element.find('section').find('h3').length).toBe(1);
      expect(element.find('section').find('h3').text()).toBe('Saved Colors');
      expect(element.find('section').find('div').length).toBe(0);
    });


    it('should render saved colors as divs', function () {
      var element = $compile('<colorpicker></colorpicker>')($rootScope);
      $rootScope.$apply();

      expect(element.find('section').find('div').length).toBe(0);
      // Execute all queued http requests
      $httpBackend.flush();
      expect(element.find('section').find('div').length).toBe(1);
    });

  });

});