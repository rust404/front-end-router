import Vue from 'vue/dist/vue.esm.js'

const getHistoryPath = () => {
  return window.location.pathname
}

const routes = [
  {
    path: '/a', component: {
      template: '<div>a</div>'
    }
  },
  {
    path: '/b', component: {
      template: '<div>b</div>'
    }
  },
]

Vue.prototype.$routes = routes

const RouterView = {
  name: 'router-view',
  template: '<component :is="matchComponent" />',
  mounted() {
    this.onPopState()
    this.$root.$on('popstate', this.onPopState)
  },
  data() {
    return {
      matchComponent: null
    }
  },
  methods: {
    onPopState() {
      const path = getHistoryPath()
      this.matchComponent = this.$routes.filter(route => route.path === path)[0].component
    }
  },
}

const RouterLink = {
  name: 'router-link',
  props: {
    to: String
  },
  template: '<a :href="to" @click="onClick"><slot/></a>',
  methods: {
    onClick(e) {
      e.preventDefault()
      window.history.pushState(null, '', this.to)
      this.$root.$emit('popstate')
    }
  }
}

Vue.component('router-view', RouterView)
Vue.component('router-link', RouterLink)

new Vue({
  template: `
    <div>
      <router-link to="/a">a</router-link>
      <router-link to="/b">b</router-link>
      <router-view/>
    </div>
  `
}).$mount('#app')
