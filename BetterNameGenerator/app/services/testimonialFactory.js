
nameApp.factory('testimonialFactory', function () {

    var factory = {};
    var testimonials = [
        {
            "quote": "My last hand developed in just 3 days. Thanks Numberology!",
            "author": "Joozy Socker",
        },
        {
            "quote": "I never have to stand in line at the bakery any more.",
            "author": "Sanco Bulldunk",
        },
    ]

    factory.getTestimonial = function () {
        var rnd = Math.random();
        var index = Math.round(rnd % testimonials.length);

        return testimonials[index];
    }

    return factory;
});