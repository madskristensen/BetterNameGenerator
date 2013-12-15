/* globals nameApp */

nameApp.controller('nameController', ['$scope', '$location', 'testimonialFactory', function ($scope, $location, testimonialFactory) {

    $scope.name = '';
    $scope.gender = '';
    $scope.testimonial = {};

    $scope.generate = function () {
        if (localStorage) {
            localStorage.name = $scope.name;
            localStorage.gender = $scope.gender;
        }

        var name = $scope.name.trim().replace(/ /ig, "-").toLowerCase()

        $location.path('/result/' + $scope.gender + '/' + name);
    };

    function init() {
        if (localStorage) {
            $scope.name = localStorage.getItem('name');
            $scope.gender = localStorage.getItem('gender') || 'male';
        }
        
        var t = testimonialFactory.getTestimonial();
        
        $scope.testimonial.quote = t.quote;
        $scope.testimonial.name = t.author;
    }

    init();

}]);