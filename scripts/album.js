//Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtURL: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26'},
        { title: 'Green', duration: '3:14'},
        { title: 'Red', duration: '5:01'},
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

//Another example album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtURL: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator', duration: '1:01'},
        { title: 'Ring, ring, ring', duration: '5:01'},
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14'},
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
     + '    <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '    <td class="song-item-title">' + songName + '</td>'
     + '    <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        
        if (currentlyPlayingSong !== null) {
            //revert to song number for currently playing song because user started playing a new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);            
        }
        
        if (currentlyPlayingSong !== songNumber) {
            //switch from play to pause button to indicate a new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;            
        } else if (currentlyPlayingSong === songNumber) {
            //switch from pause to play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
                
    };
    
    var onHover = function(event) {
      //what to do when hovering over a song.  This first part finds the and stores the song number for that given song.
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        //if you are a hovering over a song that is not what is currently playing, show the playButtonTemplate.
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        //what to do when the mouse leaves a song that is being hovered over.
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        //if you are leaving a song row that is not the currently playing song, show the songNumber (instead of the playButtonTemplate above)
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
        
    };
    
    //this is similar to querySelector(), using it hear to find '.song-item-number' for whichever row is clicked.  The click executes the callback we pass to it when the target element is clicked.
    $row.find('.song-item-number').click(clickHandler);
    //callback that executes one of the two functions below when someone hovers over and then leaves
    $row.hover(onHover, offHover);
    
    return $row;
};

var setCurrentAlbum = function(album) {
    //#1 
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    //#2 
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtURL);
    
    //#3
    $albumSongList.empty();
    
    //#4
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
       
};

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//store state of playing songs.  This is set as null so that no song is identified as playing until we click one.
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    
});


