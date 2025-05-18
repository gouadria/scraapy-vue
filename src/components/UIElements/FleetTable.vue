<script lang="ts">
import { defineComponent } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

interface FleetRow {
  value: string
}

export default defineComponent({
  name: 'FleetTable',
  components: {
    MainBtn
  },
  props: {
    fleetData: {
      type: Array as () => FleetRow[],
      required: true
    }
  },
  data() {
    return {
      data: this.fleetData
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.$emit('update', newVal)
      },
      deep: true
    }
  },
  methods: {
    addFleetRow() {
      this.data = [...this.data, { value: '' }]
    },
    deleteFleetRow(index: number) {
      if (this.data.length === 1) return
      this.data = this.data.filter((_, i) => i !== index)
    }
  }
})
</script>

<template>
  <div class="section">
    <div class="section-header">
      <img src="@/assets/svg-icons/fleet.svg?url" />
      <div class="header-text">
        <h1>{{ $t('fleetTable.title') }}</h1>
        <span>{{ $t('fleetTable.subtitle') }}</span>
      </div>
    </div>
    <div class="fleet-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('fleetTable.plateNumber') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>
              <input v-model="data[index].value" type="text" placeholder="Enter Plate Number" />
            </td>
            <td>
              <button @click="deleteFleetRow(index)" class="delete-button">
                <img src="@/assets/svg-icons/delete.svg?url" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="add-button-container">
        <MainBtn type="green" @click="addFleetRow">
          <div class="btn-content">+ {{ $t('fleetTable.add') }}</div>
        </MainBtn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fleet-table {
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 740px;
}

.fleet-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.fleet-table th,
.fleet-table td {
  padding: 8px;
  text-align: center;
  min-width: 80px;
}

.fleet-table td {
  height: 72px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid var(--Gray-200, #eaecf0);
}

.fleet-table td input {
  border: none;
}

.fleet-table td input:focus-visible {
  border: none;

  outline: none;
}

.fleet-table td input::placeholder {
  color: var(--Dark-200, #d1d1d1);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.fleet-table th {
  background-color: #f2f2f2;
}

.fleet-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
}

.add-button-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 17px 0;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
}

.section h1 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}

.section span {
  color: var(--Dark-500, #6d6d6d);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
</style>
