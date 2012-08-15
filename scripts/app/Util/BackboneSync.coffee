require ['backbone', 'PlantData'], (Backbone) ->
	Backbone.sync = (method, model, options) ->
		switch method
			when "read" then resp = model.id
