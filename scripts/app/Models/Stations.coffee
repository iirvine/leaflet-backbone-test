define ['Models/ThemeLayer', 'StationData'],  (ThemeLayer, StationData) ->
	symbologyOtions = [
		{ 
			range: [1,2] 
			vectorOptions:
				radius: 5
		},
		{
			range: [2,5]
			vectorOptions:
				radius: 10
		},
		{
			range: [5, 15]
			vectorOptions: 
				radius: 15
		}
	]

	plants = new ThemeLayer(StationData.getStations(),
		property: 'tann'
		symbology: symbologyOtions
		colorScheme: 'YlOrRd'
		pointToLayer: (latlng, markerOptions) ->
			if markerOptions 
				markerOptions.fillOpacity = 0.8
				markerOptions.stroke = false
			else
				markerOptions = 
					fillOpacity: 0.8
					radius: 3
					stroke: false
					fillColor: 'white'

			new L.CircleMarker(latlng, markerOptions)
		)