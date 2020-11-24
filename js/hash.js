class HashRouter {
  constructor({routes, routerView}) {
    this.routes = routes
    this.routerView = routerView

    window.addEventListener('hashchange', this.onHashChange)
    window.addEventListener('DOMContentLoaded', this.onLoad)
  }
  push(path) {
    window.location.hash = path
  }
  back() {
    window.history.back()
  }
  onHashChange = () => {
    const path = window.location.hash.slice(1)
    const route = this.matchRoute(path)
    if (route) {
      this.routerView.innerHTML = route.component
    } else {
      this.routerView.innerHTML = ''
    }
  }
  onLoad = () => {
    this.onHashChange()
  }
  matchRoute(path) {
    return this.routes.filter(route => route.path === path)[0]
  }
}

new HashRouter({
  routes:[
    {
      path: '/a',
      component: '<div>hello, a</div>'
    },
    {
      path: '/b',
      component: '<div>hello, b</div>'
    }
  ],
  routerView: document.querySelector('#router-view')
})
