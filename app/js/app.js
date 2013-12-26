// site/js/app.js

var app = app || {};

$(function() {
    var photos = [];
    app.photoView =  new app.PhotosView( photos );
});