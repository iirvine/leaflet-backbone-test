define (require, exports, module) ->
	$        = require 'jquery'
	Backbone = require 'backbone'
	router   = require 'router'

	AppRouter = router.AppRouter

	App =
		start: ->
			new AppRouter()