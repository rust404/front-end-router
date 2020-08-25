let routerView

const routes = {
  '/a': '<div>hello, a</div>',
  '/b': '<div>hello, b</div>'
}

const onLoad = () => {
  routerView = document.querySelector('#router-view')
  const links = document.querySelectorAll('a[href]')
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const href = link.getAttribute('href')
      window.history.pushState(null, '', href)
      onPopState()
    })
  })
  onPopState()
}

const onPopState = () => {
  const path = window.location.pathname
  if (routes.hasOwnProperty(path)) {
    routerView.innerHTML = routes[path]
  } else {
    routerView.innerHTML = ''
  }
}

window.addEventListener('popstate', onPopState)
window.addEventListener('DOMContentLoaded', onLoad)
