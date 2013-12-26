var app = app || {};

app.PhotosView = Backbone.View.extend({
    el: '#photos',

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
    }
});