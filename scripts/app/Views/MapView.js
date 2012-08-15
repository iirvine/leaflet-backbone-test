// Generated by CoffeeScript 1.3.3
(function() {

  define(function(require) {
    var MapView, Stations;
    Stations = require('Models/Stations');
    MapView = Backbone.View.extend({
      el: "div#map",
      initialize: function() {
        this.mapProvider = this.options.mapProvider;
        this.initialCenter = this.options.initialCenter || {
          lat: 45.523,
          lon: -122.67
        };
        return this.render();
      },
      setInitialView: function() {
        return this.mapProvider.setView({
          lat: this.initialCenter.lat,
          lon: this.initialCenter.lon,
          zoomLevel: 7
        });
      },
      render: function() {
        this.mapProvider.createMap(this.el.id);
        this.mapProvider.addLayer(Stations);
        return this.setInitialView();
      }
    });
    return MapView;
  });

}).call(this);