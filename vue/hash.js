import Vue from 'vue/dist/vue.esm.js'

const getHashPath = () => {
  return window.location.hash.slice(1)
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
  data() {
    return {
      matchComponent: null
    }
  },
  methods: {
    onHashChange() {
      const path = getHashPath()
      this.matchComponent = this.$routes.filter(route => route.path === path)[0].component
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.onHashChange)
  }
}

const RouterLink = {
  name: 'router-link',
  props: {
    to: String
  },
  template: '<a :href="\'#\' + to"><slot/></a>',
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
