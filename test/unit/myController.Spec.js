describe("myController Unit testing #1", function () {
    
    // Arrange
    var mockScope;
    var controller;

    beforeEach(angular.mock.module("myApp"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();

        var mockBackendService = {
            init: function() {
                return 1;
            },
            step: function() {
                return 5;
            },
            echo: function(msg) {
                return 'echo[' + msg + ']';
            }
        };
        
        controller = $controller("myController", {
            $scope: mockScope,
            backendService: mockBackendService
        });
    }));
    
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    })
    
    it("Increments counter", function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(5);
    });
    
    it("Resets counter", function () {
        mockScope.resetCounter();
        expect(mockScope.counter).toEqual(1);
    });
});

describe("myController Unit testing #2", function () {
    
    // Arrange
    var mockScope;
    var mockBackendService;
    var controller;

    beforeEach(angular.mock.module("myApp"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        
        mockBackendService = {
            init: function() {},
            step: function() {}
        };
        
        controller = $controller("myController", {
            $scope: mockScope,
            backendService: mockBackendService
        });
    }));
    
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    })
    
    it("Increments counter", function () {
        spyOn(mockBackendService, 'step').and.callFake(function() {
            return 5;
        });

        mockScope.incrementCounter();
        
        expect(mockScope.counter).toEqual(5);
    });
    
    it("Resets counter", function () {
        spyOn(mockBackendService, 'init').and.callFake(function() {
            return 1;
        });
        
        mockScope.resetCounter();
        
        expect(mockBackendService.init).toHaveBeenCalled();
        expect(mockScope.counter).toEqual(1);
    });
});


describe("myController Unit testing #3", function () {
    
    // Arrange
    var mockScope;
    var mockBackendService;
    var controller;

    beforeEach(angular.mock.module("myApp"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        
        mockBackendService = jasmine.createSpyObj('backendService', ['init', 'step']);
        
        controller = $controller("myController", {
            $scope: mockScope,
            backendService: mockBackendService
        });
    }));
    
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    })
    
    it("Increments counter", function () {
        mockBackendService.step.and.callFake(function() {
            return 5;
        });

        mockScope.incrementCounter();
        mockScope.incrementCounter();
        
        expect(mockScope.counter).toEqual(10);
    });
    
    it("Resets counter", function () {
        mockBackendService.init.and.callFake(function() {
            return 1;
        });
        
        mockScope.resetCounter();
        
        expect(mockBackendService.init).toHaveBeenCalled();
        expect(mockScope.counter).toEqual(1);
    });
});
