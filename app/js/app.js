// site/js/app.js

var app = app || {};

$(function() {
    var photos = [
        { title: 'photo 1' },
        { title: 'photo 2' },
        { title: 'photo 3' },
        { title: 'photo 4' },
        { title: 'photo 5' }
    ];

    new app.PhotosView( photos );
});