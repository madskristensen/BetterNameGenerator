


nameApp.controller('resultController', ['$scope', '$route', 'nameFactory', function ($scope, $route, nameFactory) {

    var gender = $route.current.params.gender;
    var name = $route.current.params.name;

    function init() {
        $scope.result = nameFactory.getBetterName(gender, name);
        
        var names = name.split('-');
        $scope.firstName = names.length == 0 ? name : names[0];
    }
    
    init();
}]);