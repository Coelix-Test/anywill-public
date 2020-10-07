<template>
  <div>
    <div class="d-flex">
      <vuetify-google-autocomplete
        id="gmapautocomple"
        append-icon="search"
        classname="form-control"
        placeholder="Start typing"
        country="us"
        @placechanged="getAddressData"
        :value="value.formatted_address"
        @input="handleAddressInput"
      >
      </vuetify-google-autocomplete>
    </div>
    <div class="map-container" ref="map" v-show="isMapVisible"></div>
  </div>
</template>

<script>
const addressProps = [
  'administrative_area_level_1', 
  'administrative_area_level_2',
  'country',
  'latitude',
  'longitude',
  'name',
  'locality',
  'place_id',
  'postal_code',
  'route',
  'street_number',
  'formatted_address',
];
export default {
  data: () => ({
    map: null,
    geocoder: null,
    marker: null,
    isMapVisible: true,
  }),
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: Object,
      default: function(){
        return {};
      }
    },
  },
  computed: {
    latitude(){
      return this.value.latitude;
    },
    longitude(){
      return this.value.longitude;
    },
    latLng(){
      return {lat: this.latitude, lng: this.longitude};
    },
  },
  watch: {
    latLng(){
      //move marker to the new position
      if(this.latitude && this.latitude !== 0 && this.longitude !== 0){
        let latLng = new google.maps.LatLng(this.latLng);
        this.placeMarkerAndPanTo(latLng);
      }
    },
  },
  methods: {
    handleAddressInput(address){
      let value = { ...this.value };
      value.formatted_address = address;
      // console.log('update value: ', value);
      this.$emit('update', value);
    },
    getAddressData(data){
      //get address from autocomplete
      let value = {};
      addressProps.forEach(prop => {
        value[prop] = data[prop];
      });

      value.formatted_address = this.value.formatted_address;
      // console.log('update value: ', value);
      this.$emit('update', value);

    },
    getAddressFromMarker(latLng){
      this.geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            
            let value = this.addressComponentsToValue(results[0]);
            value.place_id = results[0].place_id;
            value.latitude = results[0].geometry.location.lat();
            value.longitude = results[0].geometry.location.lng();

            // console.log('value: ', results[0]);
            this.$emit('update', value);

          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    },
    initMap(){
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 34.040143670778605, lng: -118.25926606850891 },
        zoom: 17
      });
      this.geocoder = new google.maps.Geocoder();
      this.map.addListener("click", e => {
        this.getAddressFromMarker(e.latLng);
      });
    },
    placeMarkerAndPanTo(latLng) {
      if(!this.marker){
        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
        });
      }
      else{
        this.marker.setPosition(latLng);
      }
      this.map.panTo(latLng);
    },
    addressComponentsToValue(addressComponents){
      let value = { 
        formatted_address: addressComponents.formatted_address 
      };
      addressComponents.address_components.forEach(addressComponent => {
        let prop = addressComponent.types.find(el => el !== 'political' || el !== 'subpremise');
        if(prop){
          value[prop] = addressComponent.short_name;
        }
      });
      return value;
    }
  },
  mounted(){
    this.initMap();
  }
}
</script>

<style lang="scss" scoped>
.map-container{
  height: 600px;
}
</style>