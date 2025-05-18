import { createStore } from 'vuex'
// Define Vuex store modules
import loading from './loading'
import Notification from './Notification'
const store = createStore({
  modules: {
    loading,
    Notification
  }
})
export default store
