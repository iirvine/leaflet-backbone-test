define (require)->
	Stations = require 'Models/Stations'

	MapView = Backbone.View.extend
		el: "div#map"

		initialize: ->
			@mapProvider = @options.mapProvider
			@initialCenter = @options.initialCenter or {lat: 45.523, lon: -122.67}
			@render()

		setInitialView: ->
			@mapProvider.setView
				lat: @initialCenter.lat
				lon: @initialCenter.lon
				zoomLevel: 7

		render: ->
			@mapProvider.createMap(@el.id)
			@mapProvider.addLayer(Stations)
			@setInitialView()

	return MapView