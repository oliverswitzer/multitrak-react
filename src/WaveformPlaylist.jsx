import React, {Component} from 'react'
import $ from "jquery"
import * as ExternalWaveformPlaylist from 'waveform-playlist'
import {SongGateway} from "./gateways/song-gateway";

export default class WaveformPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.match.params.id
    };

    this.songGateway = new SongGateway();
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const song = this.songGateway.findBySlug(this.songId);

    renderWaveformPlaylist(song.stems);

    // const db = firebase.firestore();
    // const settings = { timestampsInSnapshots: true};
    // db.settings(settings);
    //
    // const songQuery = await db.collection('songs').where('slug', '==', this.state.songId).get();
    // const song = songQuery.docs[0];
    //
    // const myStemNames = song.data().stems.map(stem => stem.fileName);
    //
    // const storage = firebase.storage();
    // const storageRef = storage.ref(`songs/${song.id}/`);
    // const getDownloadUrlPromises = myStemNames
    //   .map(stemName => storageRef.child(stemName).getDownloadURL());
    //
    // Promise.all(getDownloadUrlPromises).then(resolvedUrls => {
    //   const stemMapping = myStemNames.map((stemName, i) => {
    //     return {name: stemName, src: resolvedUrls[i]}
    //   });
    //
    //   renderWaveformPlaylist(stemMapping)
    // });

    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.songId}</h1>
        <h1 id="loading-indicator">Loading...</h1>

        <div id="top-bar" className="playlist-top-bar">
          <div className="playlist-toolbar">
            <div className="btn-group">
              <span className="btn-pause btn btn-warning"><i className="fa fa-pause"></i></span>
              <span className="btn-play btn btn-success"><i className="fa fa-play"></i></span>
              <span className="btn-stop btn btn-danger"><i className="fa fa-stop"></i></span>
              <span className="btn-rewind btn btn-success"><i className="fa fa-fast-backward"></i></span>
              <span className="btn-fast-forward btn btn-success"><i className="fa fa-fast-forward"></i></span>
            </div>
            <span className="audio-pos"/>
          </div>
        </div>

        <div id="playlist"></div>
      </div>
    )
  }
}

function renderWaveformPlaylist(stemUrls) {
  const playlist = ExternalWaveformPlaylist.init({
    samplesPerPixel: 3000,
    mono: true,
    waveHeight: 70,
    container: document.getElementById('playlist'),
    state: 'cursor',
    colors: {
      waveOutlineColor: '#E0EFF1',
      timeColor: 'grey',
      fadeColor: 'black'
    },
    controls: {
      show: true,
      width: 400
    },
    zoomLevels: [500, 1000, 3000, 5000]
  });

  playlist.load(stemUrls).then(() => {
    $('#loading-indicator').hide()
  });

  const ee = playlist.getEventEmitter();
  const $container = $("body");

  $container.on("click", ".btn-play", () => {
    ee.emit("play")
  });

  $container.on("click", ".btn-stop", () => {
    ee.emit("stop")
  });
}

