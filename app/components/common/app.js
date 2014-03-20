'use strict';

angular.module('quickFormApp', [
  'ngRoute',
  'ui.bootstrap',
  'hljs'
])


  //common config
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/common/main.html'
      })
      .otherwise({
        redirectTo: '/'
    });
  }])

  //formbuilder config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formbuilder', {
        templateUrl: 'components/formbuilder/formbuilder.html'
      });

  }])

  //formpreview config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formpreview', {
        templateUrl: 'components/formpreview/formpreview.html'
      });

    //decorators for form and ngModel to allow for dynamic naming in form preview
    $provide.decorator('formDirective',['$delegate', function($delegate) {
      var form = $delegate[0], controller = form.controller;
      form.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {
        var $interpolate = $injector.get('$interpolate');
        attrs.$set('name', $interpolate(attrs.name || attrs.ngForm || '')(scope));
        $injector.invoke(controller, this, {
          '$scope': scope,
          '$element': element,
          '$attrs': attrs
        });
      }];
      return $delegate;
    }]);
    $provide.decorator('ngModelDirective', ['$delegate', function($delegate) {
      var ngModel = $delegate[0], controller = ngModel.controller;
      ngModel.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {
        var $interpolate = $injector.get('$interpolate');
        attrs.$set('name', $interpolate(attrs.name || '')(scope));
        $injector.invoke(controller, this, {
          '$scope': scope,
          '$element': element,
          '$attrs': attrs
        });
      }];
      return $delegate;
    }]);

  }])

  //output config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/output', {
        templateUrl: 'components/output/output.html'
      });

  }])

;