import './App.css'
import Editor from './pages/editor';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor/:vid">
          <Editor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
