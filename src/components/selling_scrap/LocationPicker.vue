<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useGeolocation } from '@vueuse/core';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mapContainer = ref<HTMLElement | null>(null);
const addressInput = ref('');
const map = ref<L.Map | null>(null);
const marker = ref<L.Marker | null>(null);
const { coords } = useGeolocation();

// Fix for Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const initializeMap = () => {
  if (mapContainer.value && !map.value) {
    // Init map with safe default
    map.value = L.map(mapContainer.value).setView([24.7136, 46.6753], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);

    map.value.on('click', (e: L.LeafletMouseEvent) => {
      setMarker(e.latlng);
      reverseGeocode(e.latlng);
    });
  }
};

onMounted(() => {
  initializeMap();

  // Watch for valid coordinates to set marker
  watch(
    () => coords.value,
    (newCoords) => {
      if (
        isFinite(newCoords.latitude) &&
        isFinite(newCoords.longitude)
      ) {
        const position = L.latLng(newCoords.latitude, newCoords.longitude);
        if (map.value) {
          map.value.setView(position, 15);
          setMarker(position);
          reverseGeocode(position);
        }
      }
    },
    { immediate: true }
  );
});

// Watch addressInput and save it to localStorage when changed
watch(addressInput, (newAddress) => {
  if (newAddress && newAddress.trim() !== '') {
    localStorage.setItem('pickupAddress', newAddress);
  }
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

const setMarker = (latlng: L.LatLng) => {
  if (!latlng || !isFinite(latlng.lat) || !isFinite(latlng.lng)) return;

  if (marker.value && map.value) {
    map.value.removeLayer(marker.value);
  }

  if (map.value) {
    marker.value = L.marker(latlng).addTo(map.value);
  }
};

const reverseGeocode = async (latlng: L.LatLng) => {
  try {
    if (!latlng || !isFinite(latlng.lat) || !isFinite(latlng.lng)) return;

    addressInput.value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;

    // Exemple si tu veux utiliser un vrai service :
    // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`);
    // const data = await response.json();
    // addressInput.value = data.display_name;
  } catch (error) {
    console.error('Geocoding error:', error);
  }
};

const useCurrentLocation = () => {
  if (
    isFinite(coords.value.latitude) &&
    isFinite(coords.value.longitude) &&
    map.value
  ) {
    const position = L.latLng(coords.value.latitude, coords.value.longitude);
    map.value.setView(position, 15);
    setMarker(position);
    reverseGeocode(position);
  }
};
</script>

<template>
  <div class="location-picker">
    <div class="location-header">
      <div class="location-icon">📍</div>
      <h2>Please provide pickup location</h2>
    </div>

    <p class="instruction">Press and hold to place the marker on your location.</p>

    <div class="map-container" ref="mapContainer" style="height: 400px;"></div>

    <div class="address-container">
      <input
        type="text"
        v-model="addressInput"
        placeholder="Enter your address..."
        class="address-input"
      />
      <button class="location-button" @click="useCurrentLocation">
        Use current location
      </button>
    </div>
  </div>
</template>


<style scoped>
.location-picker {
  margin-bottom: 24px;
  max-width: 550px;
}

.location-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.location-icon {
  font-size: 20px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.instruction {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.map-container {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
}

.address-container {
  display: flex;
  gap: 12px;
}

.address-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

.location-button {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.location-button:hover {
  background-color: #e5e7eb;
}
</style>