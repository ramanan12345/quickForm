'use strict';

angular.module('quickFormApp')
  .controller('ModelbuilderCtrl', function ($scope, $http, $modal, $compile, inputTypes, outputfactory) {

    //input types
    $scope.inputTypes = inputTypes.inputTypes;

    //form builder functions
    $scope.form = {
      name: 'Employee',
      fields:
        [
          {field_id: '1',
          field_title: 'First Name',
          field_type: 'text',
          field_value: '',
          field_required: true
          },
          {field_id: '2',
          field_title: 'Last Name',
          field_type: 'text',
          field_value: '',
          field_required: true
          },
          {field_id: '3',
          field_title: 'Email Address',
          field_type: 'email',
          field_value: '',
          field_required: false
          },
          {field_id: '4',
          field_title: 'Years of experience',
          field_type: 'number',
          field_value: '',
          field_required: false
          },
          {field_id: '5',
          field_title: 'Date of Birth',
          field_type: 'date',
          field_value: '',
          field_required: true
          }
        ]
    };


    var newFieldId = function(){
      if($scope.form.fields.length > 0){
        return $scope.form.fields[$scope.form.fields.length - 1].field_id + 1
      }
      return 1;
    };
    $scope.addNewField = function(type){

      var newField = {
        "field_id" : newFieldId(),
        "field_title" : type,
        "field_type" : type,
        "field_value" : '',
        "field_required": false
      };

      // put newField into fields array
      $scope.form.fields.push(newField);

    };
    $scope.deleteField = function (field_id){

      for(var i = 0; i < $scope.form.fields.length; i++){
        if($scope.form.fields[i].field_id == field_id){
          $scope.form.fields.splice(i, 1);
          break;
        }
      }
    };
    $scope.showFieldOptions = function(type){
      var options = false;
      angular.forEach(inputTypes.inputTypes, function(input){
        if(type == input.input_type){
          options = input.options;
        }
      });
      return options;
    };
    $scope.addOption = function (field){

      if(!field.field_options){
        field.field_options = new Array();
      }

      var lastOptionID = 0;

      if(field.field_options[field.field_options.length-1]){
        lastOptionID = field.field_options[field.field_options.length-1].option_id;
      }

      // new option's id
      var option_id = lastOptionID + 1;

      var newOption = {
        "option_id" : option_id,
        "option_title" : "Option " + option_id,
        "option_value" : option_id
      };

      // put new option into field_options array
      field.field_options.push(newOption);
    };
    $scope.deleteOption = function (field, option){
      for(var i = 0; i < field.field_options.length; i++){
        if(field.field_options[i].option_id == option.option_id){
          field.field_options.splice(i, 1);
          break;
        }
      }
    };
    $scope.reset = function (){
      $scope.form.name = '';
      $scope.form.fields.splice(0, $scope.form.fields.length);
    };

    //output
    $scope.outputButtons = outputfactory.outputTypes;
    $scope.style = {type:'html'};
    $scope.codeSource = function(form, style){
      return outputfactory.outputFunction(form, style);
    };

  });