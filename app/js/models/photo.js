var app = app || {};

app.Photo = Backbone.Model.extend({
    defaults: {
        image: 'img/loading.gif',
        title: 'No title'
    }
});