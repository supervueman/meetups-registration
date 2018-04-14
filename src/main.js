import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA961VDgyAMkM6f-XI8ZBtG8swLKPhy-wY',
      authDomain: 'devmeetup-ba548.firebaseapp.com',
      databaseURL: 'https://devmeetup-ba548.firebaseio.com',
      projectId: 'devmeetup-ba548',
      storageBucket: 'gs://devmeetup-ba548.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
