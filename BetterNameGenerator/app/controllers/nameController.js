


nameApp.controller('nameController',['$scope', '$location', function ($scope, $location) {

    $scope.name = '';
    $scope.gender = '';
    $scope.testimonial = {};

    $scope.generate = function () {
        if (localStorage) {
            localStorage['name'] = $scope.name;
            localStorage['gender'] = $scope.gender;
        }

        $location.path('/result/' + $scope.gender + '/' + $scope.name);
    };

    function init() {
        if (localStorage) {
            $scope.name = localStorage.getItem('name');
            $scope.gender = localStorage.getItem('gender') || 'male';
        }

        $scope.testimonial.quote = "My last hand developed in just 3 days. Thanks Numberology!";
        $scope.testimonial.name = "Joozy Socker";
    }

    init();

}]);