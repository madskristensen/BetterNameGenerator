///#source 1 1 /app/app.js
var nameApp = angular

    .module('nameApp', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/',
            {
                controller: 'nameController',
                templateUrl: '/app/views/form.min.html'
            })
            .when('/result/:gender/:name',
            {
                controller: 'resultController',
                templateUrl: '/app/views/result.min.html'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    }]);
///#source 1 1 /app/services/nameFactory.js
/* globals nameApp */

nameApp.factory('nameFactory', function () {

    var factory = {},
        names = {
            "male": [
                "Sancoon",
                "Bjort",
                "Crawgy",
                "Bootan",
                "Roll",
                "Tallo",
                "Farticus",
                "Droolio",
                "Dorcas",
                "Spank",
                "Jazz",
            ],
            "female": [
                "Ingroan",
                "Bamsa",
                "Fooleen",
                "Dolla",
                "Flatulla",
                "Bawlina",
                "Drooly",
            ],
            "last": [
                "Smalingo",
                "Diccus",
                "deFunky",
                "Bulldunk",
                "Haberdashery",
                "McDorky",
                "Craphoolio",
            ]
        };

    factory.getBetterName = function (gender, name) {

        var list = names[gender];
        var hash = (gender + name.toLowerCase()).hashCode();

        var first = Math.abs(hash % list.length);
        var last = Math.abs(hash % names.last.length);

        return list[first] + " " + names.last[last];
    };

    String.prototype.hashCode = function () {
        var hash = 0;
        if (this.length === 0) return hash;
        for (var i = 0; i < this.length; i++) {
            var character = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    return factory;
});
///#source 1 1 /app/services/testimonialfactory.js
/* globals nameApp */

nameApp.factory('testimonialFactory', function () {

    var factory = {},
        testimonials = [
        {
            "quote": "My final toe developed in just 3 days. Thanks Numberology!",
            "author": "Joozy Socker",
        },
        {
            "quote": "I never have to stand in line at the bakery any more.",
            "author": "Sanco Bulldunk",
        },
        {
            "quote": "I could never run a marathon before I got my new name.",
            "author": "Drooly McDorky",
        }
        ];

    factory.getTestimonial = function () {
        var index = Math.floor((Math.random() * testimonials.length));
        return testimonials[index];
    };

    return factory;
});
///#source 1 1 /app/controllers/resultController.js
/* globals nameApp */

nameApp.controller('resultController', ['$scope', '$route', 'nameFactory', function ($scope, $route, nameFactory) {

    var gender = $route.current.params.gender;
    var name = $route.current.params.name;

    function init() {
        $scope.result = nameFactory.getBetterName(gender, name);
        
        var names = name.split('-');
        $scope.firstName = names.length === 0 ? name : names[0];
    }
    
    init();
}]);
///#source 1 1 /app/controllers/nameController.js
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
