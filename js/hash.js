let routerView

const routes = {
  '/a': '<div>hello, a</div>',
  '/b': '<div>hello, b</div>'
}

const onLoad = () => {
  routerView = document.querySelector('#router-view')
  onHashChange()
}

const onHashChange = () => {
  const path = window.location.hash.slice(1)
  if (routes.hasOwnProperty(path)) {
    routerView.innerHTML = routes[path]
  } else {
    routerView.innerHTML = ''
  }
}

window.addEventListener('hashchange', onHashChange)
window.addEventListener('DOMContentLoaded', onLoad)
