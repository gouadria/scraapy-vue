<template>
  <div class="map-wrapper">
    <div v-if="gSearch === true" id="gSearch">
      <img src="@/assets/svg-icons/gSearch.svg?url" class="input-icon" />
      <input ref="searchInput" type="search" placeholder="Search" />
    </div>
    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

export default defineComponent({
  name: 'MapElement',
  props: {
    gSearch: {
      type: Boolean,
      default: true
    },
    zoomBtns: {
      type: Boolean,
      default: true
    },
    address: {
      type: Object
    },
    updateMarker: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      center: { lat: 24.7136, lng: 46.6753 },
      map: null as google.maps.Map | null,
      marker: null as google.maps.Marker | null,
      zoom: 5
    }
  },
  mounted() {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['places']
    })
    loader.load().then(() => {
      this.loadMap();
    })
  },
  watch: {
    zoomBtns() {
      this.loadMap();
    },
    address() {
      if (this.address) {
        this.loadMap();
      }
    }
  },
  methods: {
    logMarkerLocation(stage: string) {
      if (this.marker) {
        const pos = this.marker.getPosition();
        if (pos) {
        } else {
        }
      } else {
      }
    },
    handleMarkerChange() {
      if (!this.marker) {
        return;
      }
      const position = this.marker.getPosition();
      if (!position) {
        console.log("handleMarkerChange: Marker position not available.");
        return;
      }
      this.logMarkerLocation("handleMarkerChange");

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          let address = results[0].address_components;
          // Append latitude and longitude to the address components
          address.push({
            long_name: position.lat().toString(),
            short_name: position.lat().toString(),
            types: ['lat']
          });
          address.push({
            long_name: position.lng().toString(),
            short_name: position.lng().toString(),
            types: ['lng']
          });
          this.$emit('address-changed', address);
        } else {
          console.error('handleMarkerChange: Geocoder failed due to: ' + status);
        }
      });
    },
    async loadMap() {
      if (this.address) {
        // Build the complete address from available parts
        const addressParts = [
          this.address.addressLine1,
          this.address.city,
          this.address.province,
          this.address.zipCode,
          this.address.country // include country if available
        ].filter(part => part && part.trim() !== '');
        const completeAddress = addressParts.join(' ');
        console.log('loadMap: Geocoding address:', completeAddress);

        const geocoder = new google.maps.Geocoder();
        try {
          // Wrap the geocode call in a promise to await its result
          const geocodeResult = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
            geocoder.geocode({ address: completeAddress }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                resolve(results[0]);
              } else {
                reject(status);
              }
            });
          });
          this.center = {
            lat: geocodeResult.geometry.location.lat(),
            lng: geocodeResult.geometry.location.lng()
          };
          this.zoom = 17;
        } catch (error) {
          console.error('loadMap: Geocoder failed due to:', error);
          this.center = { lat: 24.7136, lng: 46.6753 };
          this.zoom = 5;
        }
      } else {
        this.center = { lat: 24.7136, lng: 46.6753 };
        this.zoom = 5;
      }

      if (!this.$refs.mapContainer) {
        console.error("loadMap: mapContainer not found.");
        return;
      }
      this.map = new google.maps.Map(this.$refs.mapContainer as HTMLElement, {
        center: this.center,
        streetViewControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        zoom: this.zoom,
        zoomControl: this.zoomBtns
      });

      // Place a draggable marker at the determined center
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title: 'Your Address',
        draggable: this.updateMarker
      });
      this.logMarkerLocation("After Marker Creation");

      // Listen for marker dragend events
      this.marker.addListener('dragend', () => {
        console.log("Marker dragend event triggered.");
        this.logMarkerLocation("dragend");
        this.handleMarkerChange();
      });

      // Listen for map click events to update the marker position
      this.map.addListener('click', (e) => {
        if (!this.updateMarker) return;
        const position = e.latLng;
        if (this.marker) {
          this.marker.setPosition(position);
        } else {
          this.marker = new google.maps.Marker({
            position: position,
            map: this.map,
            draggable: true
          });
          this.marker.addListener('dragend', () => {
            this.handleMarkerChange();
          });
        }
        this.logMarkerLocation("Map Click");
        this.handleMarkerChange();
      });

      if (this.gSearch) {
        // Initialize Autocomplete
        const inputElement = this.$refs.searchInput as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(inputElement);
        autocomplete.bindTo('bounds', this.map);

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) {
            return;
          }
          if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
          } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
          }
          if (this.marker) {
            this.marker.setPosition(place.geometry.location);
          } else {
            this.marker = new google.maps.Marker({
              position: place.geometry.location,
              map: this.map,
              draggable: true
            });
            this.marker.addListener('dragend', () => {
              this.handleMarkerChange();
            });
          }
          this.logMarkerLocation("Autocomplete");
          this.handleMarkerChange();
        });
      }
    }
  }
})
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  position: relative;
}

#gSearch {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  display: flex;
  height: 32px;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--Gray-100, #f2f4f7);
  background: var(--Base-White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

/* reset default input for all states */
#gSearch input {
  border: none;
  background: none;
  outline: none;
  width: 112px;
  transition: width 0.3s;
}

#gSearch input:focus-within {
  width: 250px;
  /* Expanded width on focus */
}

.map-container {
  width: 100%;
  min-height: 212px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}
</style>
