class HistoryRouter {
  constructor({routes, routerView}) {
    this.routes = routes
    this.routerView = routerView

    window.addEventListener('popstate', this.onPopState)
    window.addEventListener('DOMContentLoaded', this.onLoad)
  }
  push(path) {
    window.history.pushState(null, null, path)
  }
  back() {
    window.history.back()
  }
  onPopState = () => {
    const path = window.location.pathname
    const route = this.matchRoute(path)
    if (route) {
      this.routerView.innerHTML = route.component
    } else {
      this.routerView.innerHTML = ''
    }
  }
  onLoad = () => {
    const links = document.querySelectorAll('a[href].router-link')
    links.forEach(link => {
      link.addEventListener('click',  (e) => {
        e.preventDefault()
        const href = link.getAttribute('href')
        window.history.pushState(null, '', href)
        this.onPopState()
      })
    })
    this.onPopState()
  }
  matchRoute(path) {
    return this.routes.filter(route => route.path === path)[0]
  }
}
new HistoryRouter({
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
