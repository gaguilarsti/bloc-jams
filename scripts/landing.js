var animatePoints = function(points) {
    var revealPoint = function() {
        //#7 
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translate(0)'
        });
    };
    
    $.each($('.point'), revealPoint);               
};

var animateTitle = function () {
    var title = document.querySelector(".hero-title");
    
    var revealTitle = function () {
        title.style.opacity = 1;
        title.style.fontSize = "5rem";
        title.style.fontWeight = 500;
        title.style.letterSpacing = "0.7rem";
    };
    
    revealTitle();
};

$(window).load(function () {
    //#1 - updated the .innerHeight property to jQuery's heigh() method.  
    if ($(window).height() > 950) {
         animatePoints();
     }

    //#2 no longer need a seperate variable to hold .selling-points element and replace getBoundingClientRect() with jQuery's .offset() method.
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    //#3 - the addEventListener() method becomes jQuery's scroll() method, which takes a function as an argument.  
    $(window).scroll(function (event) {
        //#4 - replace document.documentElement.scrollTop || document.body.scrollTop with the jQuery equivalent of $(window).scrollTop().
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    
    });
});

