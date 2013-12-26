var app = app || {};

app.PhotosView = Backbone.View.extend({
    el: '#photos',
    events:{
        'click #getPhotos':'getPhotos'
    },
    initialize: function( initialPhotos ) {
        this.collection = new app.Photos( initialPhotos );
        this.render();
    },

    // render photoContainer by rendering each photo in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderPhoto( item );
        }, this );
    },

    // render a photo by creating a PhotoView and appending the
    // element it renders to the library's element
    renderPhoto: function( item ) {
        var photoView = new app.PhotoView({
            model: item
        });
        this.$el.append( photoView.render().el );
    },

    // get new photos
    getPhotos: function(e) {
        e.preventDefault();
        var thisClass = this;
        // jQuery get call to photos.search call
        $.get( "http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=cd30ea58809313bcbe2d7b65482cf48f&per_page=10&nojsoncallback=1&text=polilimnio", function( data ) {
            data.photos.photo.forEach(function(entry) {
                // http get to get single photo data
                $.get( 'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=cd30ea58809313bcbe2d7b65482cf48f&nojsoncallback=1&photo_id='+entry.id, function(data) {
                    // create the new Photo model with the fetched data
                    // render the photo
                    thisClass.renderPhoto( new app.Photo({title:entry.title, image: data.sizes.size[0].source}) );
                });
            });
        });
    }
});