import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import particlesParams from './particlesjs-config.json';


const initialState = {
  input: '',
  imageSource: '',
  box: [{}],
  route: 'signIn',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageSource: '',
      box: [{}],
      route: 'signIn',
      signedIn: false,
      buttonLock: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calcFaceLocation = (data) =>{
    const clarifaiFaces = data.outputs[0].data.regions.map((e) =>{
      return e.region_info.bounding_box;
    })
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return(
      clarifaiFaces.map(element => {
        return {
          leftCol: element.left_col *width,
          topRow: element.top_row *height,
          rightCol: width - (element.right_col *width),
          bottomRow: height - (element.bottom_row *height)
        }
      })
    )
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) =>{
    this.setState({ input: event.target.value, buttonLock: false });
  }

  onRouteChange = (route) =>{
    this.setState({ route: route })
    if(route === 'signOut') {
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({ signedIn: true })
    }
  }

  onPictureSubmit = () =>{
    if(!this.state.input.includes('http://') && !this.state.input.includes('https://'))return;
    if(this.state.buttonLock)return;
    const { displayFaceBox, calcFaceLocation } = this;
    this.setState({ imageSource: this.state.input, box: [{}] });


    fetch('https://serene-castle-90081.herokuapp.com/image', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://serene-castle-90081.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
              this.setState({ buttonLock: true })
            })
            .catch(console.log)
        }
        displayFaceBox(calcFaceLocation(response))
      })
      .catch(err => console.error(err))
  }

  render() {
    const { onInputChange, onPictureSubmit, onRouteChange, loadUser } = this;
    const { imageSource, box, route, signedIn, user } = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation onRouteChange={onRouteChange} isSignedIn={signedIn} />

        {
          route === 'home' ?
            <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm onInputChange={onInputChange} onSubmit={onPictureSubmit} />
              <FaceRecognition box={box} imageSource={imageSource} />
            </div>
          : (
            route === 'signIn' ?
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
            :
            <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )

        }

      </div>
    )
  }
}

export default App;
