import React, {useState, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const RouteContext = React.createContext({
  curPath: '', onPopState: () => {} })

const getHistoryPath = () => {
  return window.location.pathname
}

const BrowserRouter = (props) => {
  const [curPath, setCurPath] = useState(getHistoryPath)
  const onPopState = () => {
    setCurPath(getHistoryPath())
  }
  useEffect(() => {
    onPopState()
  }, [])
  return (
    <RouteContext.Provider value={{curPath, onPopState}}>
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
  const {onPopState} = useContext(RouteContext)
  return <a href={props.to} onClick={(e) => {
    e.preventDefault()
    window.history.pushState(null, '', props.to)
    onPopState()
  }}>{props.children}</a>
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <li><Link to="/a">a</Link></li>
        <li><Link to="/b">b</Link></li>
        <Route path="/a">
          <div>a</div>
        </Route>
        <Route path="/b">
          <div>b</div>
        </Route>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
