var app = app || {};

app.PhotosView = Backbone.View.extend({
    el: '#mainContainer',
    events:{
        'click #getPhotos':'getPhotos'
    },
    initialize: function( initialPhotos ) {
        this.collection = new app.Photos( initialPhotos );
        // bind add event in collection to renderPhoto
        this.listenTo( this.collection, 'add', this.renderPhoto );
        // bind reset event in collection to render
        this.listenTo( this.collection, 'reset', this.render );
        // initialize photos collection with 'polilimnio' search term
        $('#searchField').val('polilimnio');
        this.getPhotos();
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
        this.$el.find('#photos').append( photoView.render().el );
    },

    // get new photos
    getPhotos: function(e) {
        // reset collection
        this.collection.reset([]);
        this.$el.find('#photos').empty();
        // show loading indicator
        $('#loading-indicator').show().height($(window).height()-65);
        // get value of search field
        var searchTerm = $('#searchField').val();
        var thisCollection = this.collection;
        // jQuery get call to photos.search call. Pass the searchTerm to the call
        $.get( "http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=cd30ea58809313bcbe2d7b65482cf48f&per_page=10&nojsoncallback=1&text="+searchTerm, function( data ) {
            data.photos.photo.forEach(function(entry) {
                // http get to get single photo data
                $.get( 'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=cd30ea58809313bcbe2d7b65482cf48f&nojsoncallback=1&photo_id='+entry.id, function(data) {
                    // create the new Photo model with the fetched data
                    // render the photo
                    thisCollection.add( new app.Photo({title:entry.title, image: data.sizes.size[4].source}) );
                    // hide loading indicator
                    $('#loading-indicator').hide();
                });
            });
        });

        // set #search-term's content to searchTerm
        $('#search-term').text(searchTerm);
    }
});