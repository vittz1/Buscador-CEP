var filteringInput = angular.module('filteringInput', []);
 
filteringInput.controller('MyCtrl', function($scope) {
  $scope.currencyVal;
});

filteringInput.directive('cepInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('cepp')(value, false));
            };

            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,5);
            });

            ngModelCtrl.$render = function() {
                $element.val($filter('cepp')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // Permitindo teclas DELETE e BACKSPACE
                if (event.keyCode == 8 || event.keyCode == 46){
                    return;
                }
                $browser.defer(listener);
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});
filteringInput.filter('cep', function () {
    return function (cep) {
        console.log(cep);
        if (!cep) { return ''; }

        var value = cep.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return cep;
        }

        var cep1, cep2;

        switch (value.length) {
            case 1:
            case 2:
                cep1 = value;
                break;

            default:
                cep1 = value.slice(0, 5);
                cep2 = value.slice(3);
        }

        if(cep2){
            if(cep2.length>3){
                cep2 = cep2.slice(5, 0) + '-' + cep2.slice(0,3);
            }
            else{
                cep2 = cep2;
            }

            return ( + cep1 + cep2).trim();
        }
    };
});