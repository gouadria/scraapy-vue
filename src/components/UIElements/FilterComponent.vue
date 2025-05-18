<template>
  <div class="filter_container" v-auto-animate>
    <label> {{ $t('Filter.FilterBy') }} :</label>
    <div class="row">
      <div class="filter_form" v-if="showStatus">
        <multiselect
          v-model="selectedStatus"
          :options="statusOptions"
          :placeholder="$t('Filter.Status')"
          :searchable="false"
          :clearable="true"
          label="label"
          track-by="value"
          @clear="handleClear('status')"
        ></multiselect>
      </div>
      <div class="filter_form" v-if="showCategory">
        <multiselect
          v-model="selectedCategory"
          :options="categoryOptions"
          :placeholder="$t('Filter.Category')"
          :searchable="false"
          :clearable="true"
          label="label"
          track-by="value"
          @clear="handleClear('category')"
        ></multiselect>
      </div>

      <div class="filter_form" v-if="showType">
        <multiselect
          v-model="selectedType"
          :options="typeOptions"
          :placeholder="$t('Filter.Type')"
          :searchable="false"
          :clearable="true"
          label="label"
          track-by="value"
          @clear="handleClear('type')"
        ></multiselect>
      </div>

      <div class="filter_form" v-if="showAllTime">
        <multiselect
          v-model="selectedTime"
          :options="timeOptions"
          :placeholder="$t('Filter.AllTime')"
          :searchable="false"
          :clearable="true"
          label="label"
          track-by="value"
          @clear="handleClear('time')"
        ></multiselect>
      </div>
      <div class="filter_form" v-if="showSize">
        <multiselect
          v-model="selectedTime"
          :options="timeOptions"
          :placeholder="$t('Filter.AllTime')"
        ></multiselect>
      </div>
      <div class="filter_form" v-if="showFloor">
        <multiselect
          v-model="selectedTime"
          :options="timeOptions"
          :placeholder="$t('Filter.AllTime')"
        ></multiselect>
      </div>
    </div>
    <div class="row" v-if="towInputDate">
      <div class="filter_form">
        <InputField
          type="date"
          :value="dateFrom"
          :placeholder="$t('Filter.From')"
          @update="dateFrom = $event"
        />
      </div>
      <div class="filter_form">
        <InputField
          type="date"
          :value="dateTo"
          :placeholder="$t('Filter.To')"
          @update="dateTo = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import InputField from './inputField.vue'
interface Option {
  label: string
  value: string
}
export default defineComponent({
  name: 'FilterComponent',
  components: {
    Multiselect,
    InputField
  },
  props: {
    towInputDate: {
      type: Boolean,
      default: false,
      required: false
    },
    showCategory: {
      type: Boolean,
      default: false,
      required: false
    },
    showAllTime: {
      type: Boolean,
      default: false,
      required: false
    },
    showFloor: {
      type: Boolean,
      default: false,
      required: false
    },
    showType: {
      type: Boolean,
      default: false,
      required: false
    },
    showSize: {
      type: Boolean,
      default: false,
      required: false
    },
    filterDate: {
      type: Boolean,
      default: true,
      required: false
    },
    showStatus: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      timeOptions: [
        { label: this.$t('Filter.Today'), value: 'today' },
        { label: this.$t('Filter.thisWeek'), value: 'this_week' },
        { label: this.$t('Filter.thisMonth'), value: 'this_month' },
        { label: this.$t('Filter.AllTime'), value: 'all_time' }
      ],

      selectedStatus: null as Option | null,
      selectedCategory: null as Option | null,
      selectedType: null as Option | null,
      selectedTime: null as Option | null,
      dateFrom: null as Date | null,
      dateTo: null as Date | null
    }
  },
  methods: {
    handleClear(field: string) {
      // Programmatically clear the specific field
      switch (field) {
        case 'status':
          this.selectedStatus = null
          break
        case 'category':
          this.selectedCategory = null
          break
        case 'type':
          this.selectedType = null
          break
        case 'time':
          this.selectedTime = null
          break
      }

      // Ensure filter is emitted after clearing
      this.emitFilter()
    },
    emitFilter() {
      // console.log('Emitting filter event', this.selectedStatus)
      this.$emit('filter', {
        start_date: this.dateFrom || null,
        end_date: this.dateTo || null,
        status: this.selectedStatus || null,
        category: this.selectedCategory || null,
        type: this.selectedType || null,
        time: this.selectedTime || null
      })
    }
  },
  watch: {
    selectedStatus: 'emitFilter',
    selectedCategory: 'emitFilter',
    selectedType: 'emitFilter',
    selectedTime: 'emitFilter',
    dateFrom: 'emitFilter',
    dateTo: 'emitFilter'
  }
})
</script>

<style scoped>
.filter_container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  max-width: 100%;
}
.tow_row {
  width: 100%;
}
.tow_row,
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.arabic .multiselect-wrapper {
  justify-content: flex-start;
}
.filter_form {
  flex: 1 1 calc(25% - 10px); /* Four items per row */
  min-width: 200px;
  width: 100%;
}

.tow_row .filter_form {
  flex: 0 0 calc(25% - 10px); /* Four items per row */
  min-width: 200px;
}
.filter_form:last-child {
  /* flex: 0 0 calc(25% - 10px); */
}
@media (max-width: 898px) {
  .filter_form:last-child {
    flex: 1 1 calc(25% - 10px);
  }
}
@media (max-width: 768px) {
  .filter_form {
    flex: 1 1 calc(50% - 10px); /* Two items per row on medium screens */
  }
  .filter_form:last-child {
    flex: 1 1 calc(25% - 10px);
  }
}

@media (max-width: 480px) {
  .filter_form {
    flex: 1 1 100%; /* One item per row on small screens */
  }
}
</style>

<style>
.arabic .multiselect-wrapper {
  justify-content: flex-start;
  text-align: right;
}
.multiselect-option.is-selected,
/* .multiselect-option.is-pointed, */
.multiselect-option.is-selected.is-pointed {
  background-color: #5757bc;
}
.row .dp__input,
.tow_row .dp__input {
  padding: 10px 18px;
}
.tow_row .dp__input_wrap,
.row .dp__input_wrap {
  border-color: #d1d5db;
}
.filter_form .input-item {
  width: 100%;
}
</style>
