define (require, module) ->
	L = require 'leaflet'

	LeafletProvider = ->
		@map

		createMap: (elementId) ->
			@map = new L.Map(elementId)
			@addBaseMap()
			return @map

		addBaseMap: ->
			baseMap = new L.TileLayer("http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-light/{z}/{x}/{y}.png",
				attribution: "Map data by MapBox"
				maxZoom: 18)

			@addLayer(baseMap)

		addLayer: (layer) ->
			@map.addLayer(layer)

		setView: (options) ->
			point = new L.LatLng(options.lat, options.lon)
			@map.setView(point, options.zoomLevel)
	return LeafletProvider