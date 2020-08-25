import React, {useState, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const RouteContext = React.createContext({curPath: ''})

const getHashPath = () => {
  return window.location.hash.slice(1)
}

const BrowserRouter = (props) => {
  const [curPath, setCurPath] = useState(getHashPath)
  const onHashChange = () => {
    setCurPath(getHashPath())
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  return (
    <RouteContext.Provider value={{curPath}}>
      {props.children}
    </RouteContext.Provider>
  )
}

const Route = (props) => {
  const {curPath} = useContext(RouteContext)

  return (
    curPath === props.path && (props.component || props.children)
  )
}

const Link = (props) => {
  return <a href={`#${props.to}`}>{props.children}</a>
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <li><Link to="/a">a</Link></li>
        <li><Link to="/b">b</Link></li>
        <Route path="/a"><div>a</div></Route>
        <Route path="/b"><div>b</div></Route>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
