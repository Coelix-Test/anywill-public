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
        :value="address"
        @input="handleAddressInput"
      >
      </vuetify-google-autocomplete>
        <v-btn dark class="mt-3 ml-3" 
          
          @click="toggleMap">
          <v-fab-transition><v-icon v-text="btnInfo.icon" :key="btnInfo.icon"></v-icon></v-fab-transition>
          {{btnInfo.text}}
        </v-btn>
    </div>
    <div class="map-container" ref="map" v-show="isMapVisible"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    map: null,
    geocoder: null,
    marker: null,
    isMapVisible: true,
    addressProps: [
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
    ]
  }),
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: Object,
      default: function(){
        let value = {};
        this.addressProps.forEach(prop => {
          if(prop === 'latitude' || prop === 'longitude'){
            value[prop] = 0;
          }
          else{
            value[prop] = '';
          }
        });
      }
    },
    address: {
      type: String,
      default: '',
    },
  },
  computed: {
    btnInfo(){
      let btn;
      if(this.isMapVisible){
        btn = {
          icon: 'mdi-minus',
          text: 'Hide map'
        };
      }
      else{
        btn = {
          icon: 'mdi-plus',
          text: 'Show map'
        };
      }
      return btn;
    },
    latitude(){
      return this.value.latitude;
    },
    longitude(){
      return this.value.longitude;
    },
    latLng(){
      return {lat: this.latitude, lng: this.longitude};
    },
    // formattedAddress(){
    //   return this.value.formatted_address;
    // }
  },
  watch: {
    latLng(){
      //move marker to the new position
      if(this.latitude !== 0 && this.longitude !== 0){
        let latLng = new google.maps.LatLng(this.latLng);
        this.placeMarkerAndPanTo(latLng);
      }
    },
  },
  methods: {
    toggleMap(){
      this.isMapVisible = !this.isMapVisible;
      google.maps.event.trigger(this.map, "resize");
    },
    handleAddressInput(value){
      this.$emit('update:address', value);
    },
    getAddressData(data){
      //get address from autocomplete
      let value = {};
      this.addressProps.forEach(prop => {
        value[prop] = data[prop];
      });
      
      console.log('value: ', data);
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

            console.log('value: ', results[0]);
            this.$emit('update', value);
            this.$emit('update:address', results[0].formatted_address);

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
  height: 400px;
}
</style>