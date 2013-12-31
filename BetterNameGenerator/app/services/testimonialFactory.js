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
            "author": "Spank deFunky",
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