define(['ColorBrewer'], function(colorbrewer) {

	ThemeLayer = L.GeoJSON.extend({
		options: {
			url: "",
			visibleAtScale: true,
			scaleRange: null,
			defaultSymbol: null,
			property: null,
			symbology: null,
			colorScheme: null
		},

		initialize: function(geojson, options){
			L.Util.setOptions(this, options);

			this._geojson = geojson;
			this._layers = {};

			if (this.options.symbology)
				this.setColorInterpolation();

			if (geojson){
				this.addGeoJSON(geojson);
			}
		},

		addGeoJSON: function(geojson){
			var features = geojson.features,
			    i, len;

			if (features) {
				for (i = 0, len = features.length; i < len; i++) {
					this.addGeoJSON(features[i]);
				}
				return;
			}

			var isFeature = (geojson.type === 'Feature'),
			    geometry = isFeature ? geojson.geometry : geojson;

			if (this.options.symbology) {
				var att = this.options.property;
				for (var i = this.options.symbology.length - 1; i >= 0; i--) {
					if(geojson.properties[att] >= this.options.symbology[i].range[0] && geojson.properties[att] <= this.options.symbology[i].range[1]){
						var symbol = this.options.symbology[i].vectorOptions;
					}
				};

			};

			var layer = ThemeLayer.geometryToLayer(geometry, this.options.pointToLayer, symbol);

			this.fire('featureparse', {
				layer: layer,
				properties: geojson.properties,
				geometryType: geometry.type,
				bbox: geojson.bbox,
				id: geojson.id
			});

			this.addLayer(layer);
		},

		setColorInterpolation: function() {
			if (!this.options.colorScheme){ 
				return;
			}

			var bins = this.options.symbology.length;
			if (!(bins >= 3)){
				console.log('Need at least 3 symbology ranges');
				return;
			}

			var interpolation = window.colorbrewer[this.options.colorScheme][bins]

			this.options.symbology = _.map(this.options.symbology, function(symbology, key){
				symbology.vectorOptions.fillColor = interpolation[key];
				return symbology;
			});
		},

		setAttributes: function(e){
			var attributes, feature;
			feature = e.layer;
			attributes = e.properties ? e.properties : {};
			feature.attributes = {};

			if (attributes){
				feat.attributes = L.Util.extend(feature.attributes, attributes);
			}
		},
	});

	L.Util.extend(ThemeLayer, {
		geometryToLayer: function (geometry, pointToLayer, symbol) {
			var coords = geometry.coordinates,
			    layers = [],
			    latlng, latlngs, i, len, layer;

			switch (geometry.type) {
			case 'Point':
				latlng = this.coordsToLatLng(coords);
				return pointToLayer ? pointToLayer(latlng, symbol) : new L.Marker(latlng, symbol);

			case 'MultiPoint':
				for (i = 0, len = coords.length; i < len; i++) {
					latlng = this.coordsToLatLng(coords[i]);
					layer = pointToLayer ? pointToLayer(latlng) : new L.Marker(latlng);
					layers.push(layer);
				}
				return new L.FeatureGroup(layers);

			case 'LineString':
				latlngs = this.coordsToLatLngs(coords);
				return new L.Polyline(latlngs);

			case 'Polygon':
				latlngs = this.coordsToLatLngs(coords, 1);
				return new L.Polygon(latlngs);

			case 'MultiLineString':
				latlngs = this.coordsToLatLngs(coords, 1);
				return new L.MultiPolyline(latlngs);

			case "MultiPolygon":
				latlngs = this.coordsToLatLngs(coords, 2);
				return new L.MultiPolygon(latlngs);

			case "GeometryCollection":
				for (i = 0, len = geometry.geometries.length; i < len; i++) {
					layer = this.geometryToLayer(geometry.geometries[i], pointToLayer);
					layers.push(layer);
				}
				return new L.FeatureGroup(layers);

			default:
				throw new Error('Invalid GeoJSON object.');
			}
		},

		coordsToLatLng: function (coords, reverse) { // (Array, Boolean) -> LatLng
			var lat = parseFloat(coords[reverse ? 0 : 1]),
			    lng = parseFloat(coords[reverse ? 1 : 0]);

			return new L.LatLng(lat, lng, true);
		},

		coordsToLatLngs: function (coords, levelsDeep, reverse) { // (Array, Number, Boolean) -> Array
			var latlng,
			    latlngs = [],
			    i, len;

			for (i = 0, len = coords.length; i < len; i++) {
				latlng = levelsDeep ?
						this.coordsToLatLngs(coords[i], levelsDeep - 1, reverse) :
						this.coordsToLatLng(coords[i], reverse);
				latlngs.push(latlng);
			}

			return latlngs;
		}
	});

	return ThemeLayer;
})