requirejs.config
	baseUrl: "scripts/app"
	paths:
		'jquery'     : 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min'
		'underscore' : '../lib/underscore/underscore'
		'backbone'   : '../lib/backbone/backbone'
		'leaflet'    : '../lib/leaflet/leaflet-src'
		'StationData'  : '../../data/stations'
		'ColorBrewer': '../lib/ColorBrewer'
	shim:
		'app'        : ['jquery']
		'underscore' : 
			exports: '_'
		'backbone'   : 
			deps: ['underscore']
			exports: 'Backbone'
		'leaflet'    :
			exports: 'L'
		'StationData'  :
		    exports: 'StationData'
		'ColorBrewer':
			exports: 'ColorBrewer'

require ['app', 'jquery'], (App, $) ->
	$ -> App.start()