maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.BRIGHT,
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 20, // starting zoomx`
});

new maptilersdk.Marker()
  .setLngLat(120.94959776848555, 15.33177253047031)
  .addTo(map);
