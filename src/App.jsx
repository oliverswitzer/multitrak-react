import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import WaveformPlaylist from "./WaveformPlaylist";

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>Choose from the following songs</h3>

        <Router>
          <div>
            <ul>
              <li>
                <Link to="/songs/say-it">Say It</Link>
              </li>
            </ul>

            <hr/>

            <Route path="/songs/:id" component={WaveformPlaylist}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
