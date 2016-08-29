var animatePoints = function () {
                 
    var points = document.getElementsByClassName('point');
    
    var revealPoint = function(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
    for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    }
                               
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
