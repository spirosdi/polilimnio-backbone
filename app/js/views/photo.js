var app = app || {};

app.PhotoView = Backbone.View.extend({
    tagName: 'div',
    className: 'photoContainer',
    template: _.template( $( '#photoTemplate' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});