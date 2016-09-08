//#1 - refactor into jQuery - changed the name of the variable that stores the template from the original to 'template'.
var buildCollectionItemTemplate = function () {
    var template =
    '<div class="collection-album-container column fourth">'
    + '    <img src="assets/images/album_covers/01.png"/>'
    + '    <div class="collection-album-info caption">'
    + '        <p>'
    + '            <a class="album-name" href="/album.html"> The Colors </a>'
    + '            <br/>'
    + '            <a href="/album.html"> Pablo Picasso </a>'
    + '            <br/>'
    + '            X songs'
    + '            <br/>'
    + '        </p>'
    + '    </div>'
    + '</div>'
    ;
    
    //#2 - here we wrap 'template' in a jQuery object in case we need to use jQuery methods in the future.
    
    return $(template);
    
};

$(window).load(function () {
    //#3 - replaced the DOM selector with the shorter jQuery equivalent.
    var $collectionContainer = $('.album-covers');
    //#4 - replaced the DOM scripting 'innerHTML' property with the jQuery 'empty()' method.
    $collectionContainer.empty();
    
    
    for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
        //#5 replace the += in the for loop with '.append' which does the same thing.
        $collectionContainer.append($newThumbnail);
    }
});