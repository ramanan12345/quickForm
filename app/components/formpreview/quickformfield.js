'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', ['$http', '$compile', function ($http, $compile) {

    var linkFunction;
    linkFunction = function (scope, element) {

      //angular-ui calendar setup
      if (scope.field.input_type == 'date' || scope.field.input_type == 'month' || scope.field.input_type == 'week') {

        //Date
        scope.today = function () {
          scope.dt = new Date();
        };
        scope.today();

        scope.showWeeks = true;
        scope.toggleWeeks = function () {
          scope.showWeeks = !scope.showWeeks;
        };

        scope.clear = function () {
          scope.dt = null;
        };

        // Disable weekend selection
        scope.disabled = function (date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        scope.toggleMin = function () {
          scope.minDate = ( scope.minDate ) ? null : new Date();
        };
        scope.toggleMin();

        scope.open = function (event) {
          event.preventDefault();
          event.stopPropagation();

          scope.opened = !scope.opened;
        };

        scope.dateOptions = {
          'year-format': "'yy'",
          'starting-day': 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        scope.format = scope.formats[0];
      }

      var templateUrl = './components/formpreview/inputTemplates/' + scope.field.input_type + '.html';

      //get field template
      $http.get(templateUrl).success(function (data) {
        element.html(data);
        $compile(element.contents())(scope);
      });

      //prevents FOUC flicker - pre-render???
      element.html('');

    };

    return {
      template: '<div>{{field}}</div>',
      restrict: 'E',
      link: linkFunction
    };
  }]);