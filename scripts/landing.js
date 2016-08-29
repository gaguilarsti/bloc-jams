var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
}

var animatePoints = function(points) {
    forEach(points, revealPoint); 

    
    /* for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    } */
                               
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

window.onload = function () { //we added this function that enables things to happen after the whole DOM has been loaded by the browser.
    //alert ("The window has loaded!");
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll', function (event) {
        //console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + "pixels"); 
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    })
}

