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

//Third item for assignment
var albumAceOfBase = {
    title: 'The Sign',
    artist: 'Ace of Base',
    label: 'Arista',
    year: '1993',
    albumArtURL: 'assets/images/album_covers/22.jpg',
    songs: [
        { title: "All That She Wants", duration: '3:30'},
        { title: "Don't Turn Around", duration: '3:48'},
        { title: "Young and Proud", duration: '3:54'},
        { title: "The Sign", duration: '3:08'},
        { title: "Living in Danger", duration: '3:44'},
        { title: "Dancer in a Daydream", duration: '3:39'},
        { title: "Wheel of Fortune", duration: '3:54'},
        { title: "Waitingn for Magic \(Total remix 7\)", duration: '3:49'},
        { title: "Happy Nation", duration: '4:13'},
        { title: "Voulez-Vous Danser", duration: '3:21'},
        { title: "My Mind \(Mindless mix\)", duration: '4:10'},
        { title: "All That She Wants \(Banghra version\)", duration: '4:14'}
        
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
     + '    <td class="song-item-number">' + songNumber + '</td>'
     + '    <td class="song-item-title">' + songName + '</td>'
     + '    <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    return template;
};

//select elments that we want to populate with text dynamically        
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function (album) {
    //#1 - these items were moved into the global scope above for the assignment.
    
    
    //#2 - assign values to each part of the album (text, images) 
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtURL);
    
    //#3 - clear contents of album song container
    albumSongList.innerHTML = ' ';
    
    //#4 - build list of songs from JavaScript object
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
       
};

window.onload = function () {
    setCurrentAlbum(albumPicasso);
    
    var albums = [albumPicasso, albumMarconi, albumAceOfBase];
    
    var index = 1;
    
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]); 
        index++;
        if (index === albums.length) {
            index = 0;
        }
        
        });
};


