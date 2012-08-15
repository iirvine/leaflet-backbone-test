define (require, exports, module) ->
	$               = require 'jquery'
	MapView         = require 'Views/MapView'
	Backbone        = require 'backbone'
	LeafletProvider = require 'MapProviders.Leaflet'

	class AppRouter extends Backbone.Router
		routes: 
			"": "BoilerPlate"

		initialize: ->
			@mapView = new MapView(mapProvider: new LeafletProvider())
			
	module.exports = {AppRouter: AppRouter}