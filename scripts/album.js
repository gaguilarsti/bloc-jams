var setSong = function(songNumber) {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    //solution code
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    
    
    //my code 
    /*
    if (currentlyPlayingSongNumber !== songNumber) {
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    } else if (currentlyPlayingSongNumber === songNumber) { //why does this not work if it is just an 'else' versus an 'else if'?
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
    } 
    */
    //#1 we assign a new Buzz sound object and passed the audio file via the audioUrl property on the currentSongFromAlbum object.
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        //#2 we've passed in a settings object that has two properties defined, formats and preload. formats is an array of strings with acceptable audio formats. We've only included the 'mp3' string because all of our songs are mp3s. Setting the preload property to true tells Buzz that we want the mp3s loaded as soon as the page loads.
        formats: [ 'mp3'],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var filterTimeCode = function (timeInSeconds) {
    timeInSeconds = Math.round(timeInSeconds);
    var hours = Math.floor(timeInSeconds / (60 * 60));
    if (hours < 10) { hours = "0" + hours;}
    parseFloat(hours);

    var divisor_for_minutes = timeInSeconds % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    if (minutes < 10) { minutes = "0" + minutes;}
    parseFloat(minutes);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) { seconds = "0" + seconds;}
    parseFloat(seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
  
    return(obj["m"] + ":" + obj["s"]);
};

var totalTime = function() {
    if (currentSoundFile) {
       totalTime = currentSoundFile.getTime;
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}

var setTotalTimeInPlayerBar = function(totalTime) {
    
    $('.total-time').text(totalTime);
};

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
     + '    <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '    <td class="song-item-title">' + songName + '</td>'
     + '    <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
     + '</tr>'
     ;
    
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== null) {
            //revert to song number for currently playing song because user started playing a new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            
            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber)
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
        if (currentlyPlayingSongNumber !== songNumber) {
            //switch from play to pause button to indicate a new song is playing.
            setSong(songNumber);
            currentSoundFile.play();
            updateSeekBarWhileSongPlays();
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            
            var $volumeFill = $('.volume .fill');
            var $volumeThumb = $('.volume .thumb');
            $volumeFill.width(currentVolume + '%');
            $volumeThumb.css({left: currentVolume + '%'});
            
            $(this).html(pauseButtonTemplate);
            updatePlayerBarSong();   //this should load the song/album information and load the total time.  This appears to be the initial play click.  Not sure why it's not working.
            
        } else if (currentlyPlayingSongNumber === songNumber) {
            //switch from pause to play button to pause currently playing song.
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
                
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause(); 
                
           }
        }
        
        updatePlayerBarSong(); //I just put this in out of desperation.
                
    };
    
    var onHover = function(event) {
      //what to do when hovering over a song.  This first part finds the and stores the song number for that given song.
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        //if you are a hovering over a song that is not what is currently playing, show the playButtonTemplate.
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        //what to do when the mouse leaves a song that is being hovered over.
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        //if you are leaving a song row that is not the currently playing song, show the songNumber (instead of the playButtonTemplate above)
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
        
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber is " + typeof currentlyPlayingSongNumber);
        
    };
    
    //this is similar to querySelector(), using it hear to find '.song-item-number' for whichever row is clicked.  The click executes the callback we pass to it when the target element is clicked.
    $row.find('.song-item-number').click(clickHandler);
    //callback that executes one of the two functions below when someone hovers over and then leaves
    $row.hover(onHover, offHover);
    
    return $row;
};



var setCurrentAlbum = function(album) {
    currentAlbum = album;
    
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
     $albumImage.attr('src', album.albumArtUrl);
    
    //#3
    $albumSongList.empty();
    
    //#4
    for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
       
};





var updateSeekBarWhileSongPlays = function() {
    
  if (currentSoundFile) {
      //bind the timeupdate event to the currentSoundFile - timeupdate is a custom Buzz event that fires repeatedly while time elapses during song playback.
      currentSoundFile.bind('timeupdate', function(event) {
          var currentTime = currentSoundFile.getTime();
          var seekBarFillRatio = this.getTime() / this.getDuration();
          var $seekBar = $('.seek-control .seek-bar');
          
          updateSeekPercentage($seekBar, seekBarFillRatio);
          currentTime = filterTimeCode(currentTime);
          setCurrentTimeInPlayerBar(currentTime);
      });
  }
    
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    
    //using the built-in JavaScript Math.max() function to make sure our % isn't less than zero and the Math.min() function to make sure it doesn't exceed 100.  
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    
    //convert the % to a string and add the '%' character.  When we set the width of the .fill class and the left value of the .thumb class, the CSS interprets the value as a percent instead of a unit-less number between 0 and 100.
    
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
    
};

var setupSeekBars = function() {
    //find all elements in the DOM with a class of "seek-bar" within the class of "player-bar".  This returns a jQuery wrapped array containing both the song seek control and the volumen control.  
    var $seekBars = $('.player-bar .seek-bar');
    
    $seekBars.click(function(event) {
       //pageX is a jQuery specific event value, which holds the X coordinate at which the click event occurs. We subtract the offset() of the seek bar held in $(this) from the left side.
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        
        //divide offsetX by the width of the entire bar to calculate seekBarFillRatio
        var seekBarFillratio = offsetX / barWidth;
         
        
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillratio * currentSoundFile.getDuration());
        } else {
            updateSeekPercentage($seekBar, seekBarFillRatio);
        }
        
        
        //pass $(this) as the $seekBar argument and seekBarFillRatio for its eponymous argument to updateSeekBarPercentage(). - I dont' understand this :(
        //updateSeekPercentage($(this), seekBarFillratio);
        
    });
    
    //find all elements with a class of .thumb and attach a mousedown event listener.  Mousedown is different than click.  Mousedown fires when the mouse is clicked down, and click fires when mouse is pressed down and released.
    $seekBars.find('.thumb').mousedown(function(event){
        //taking the context of the event and wrapping it in jQuery.  this is equal to '.thumb' node that was clicked.  Because we are attaching an event to both the song seek and volume control, this is an important way for us to determine which of these nodes dispatched the event. We can then use the parent method, which will select the immediate parent of the node. This will be whichever seek bar this .thumb belongs to.
        var $seekBar = $(this).parent();
        //new way to track events, bind(). bind() behaves similar to addEventListener().  We've attached the mousemove event to $(document) to make sure that the user can drag the thumb after mousing down, even when the mouse leaves the seek bar.  
        $(document).bind('mousemove.thumb', function(event) {
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                updateSeekPercentage($seekBar, seekBarFillRatio);
            }
            
            
           //updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        //this is to unbind the mouse movements, so that once the user releases the mouse, the seek bars stop moving. 
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        }); 
    }); 
};



var setCurrentTimeInPlayerBar = function(currentTime) {
    //set the text of '.current-time' to currentTime
    
    $('.current-time').text(currentTime);
};



var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    //I don't quite understand how this is working...
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're incrementing the song here
    currentSongIndex++;
    
    //if we reached the last song in the album and next song is greater than the array length, go to the first song (e.g. wrap around). 
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    //Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    //Update the player bar information - why wouldn't we just call the already existing updatePlayerBarSong?
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    //and because I didn't understand the one above, I don't really understand this one.  :(   
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    //Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    //Update the player bar information - why wouldn't we just call the already existing updatePlayerBarSong?
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    
    var totalTime = filterTimeCode(currentSoundFile.getDuration());
    console.log(totalTime);
    setTotalTimeInPlayerBar(totalTime);

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setTotalTimeInPlayerBar = function(totalTime) {
    
    $('.total-time').text(totalTime);
};

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//set of variables in the global scope that hold current song and album information.
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    
});




