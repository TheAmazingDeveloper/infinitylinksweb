import React, { Component } from 'react'
import './App.css'
import InfinityLoader from './Components/InfinityLoader/InfinityLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {firebaseDb } from './config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import axios from 'axios';

export class App extends Component {
  state = {
    loading: true,
    imageUrl: "",
    logoImageUrl: "",
    data: []
  };
  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(async () => {
      const collectionRef = collection(firebaseDb, 'users')
      const rawData = await getDocs(collectionRef);
      const data = rawData.docs.map(doc => ({...doc.data(), id: doc.id}))
      data.map(user => {
        axios.get(user.imageUrl.toString()).then(res => {
          this.setState({imageUrl: res.data})
        })
        axios.get(user.logoImageUrl.toString()).then(res => {
          this.setState({logoImageUrl: res.data})
        })
        this.setState({loading: false, data: user})
        return null
      })
    });
  }
  render() {
    return <div className="loader">
           <div className="d-flex justify-content-center">
           <div className="loader-circle"></div>
             <InfinityLoader/>
           </div>
         </div>
  }
  //   const {loading} = this.state
  //   if(loading) {
  //     return <div className="loader">
  //         <div className="d-flex justify-content-center">
  //           <div className="loader-circle"></div>
  //           <InfinityLoader/>
  //         </div>
  //         <ParticleBackground/>
  //       </div>
  //   } else {
  //     return (
  //       <div className="main">
  //         <div className="section">
  //           <div className="profile-image-wrapper">
  //             {/* <img src={this.state.data.imageUrl} alt="profile" className="profile-image d-flex justify-content-center"/> */}
  //             <LazyLoadImage effect="blur" src={this.state.imaegUrl} className="profile-image d-flex justify-content-center" alt="profile"/>
  //           </div>
  //           <div className="profile-name d-flex justify-content-center">{this.state.data.name}</div>
  //           {this.state.data.btnsName.map(btnName => {
  //             console.log(btnName)
  //             return <div className="links d-grid" key={btnName.id}>
  //               <a href="/" className="btn mx-auto">{btnName}</a>
  //             </div>
  //           })}
  //           {/* <div className="links d-grid">
  //               <a href="/" className="btn mx-auto">Source Code</a>
  //               <a href="/" className="btn mx-auto">Youtube</a>
  //               <a href="/" className="btn mx-auto">Instagram</a>
  //               <a href="/" className="btn mx-auto">Medium</a>
  //           </div> */}
  //           <div className="logo d-flex justify-content-center">
  //             <div className="row loader-wrapper">
  //               <div className="logo-image col">
  //                 {/* <img src={this.state.data.logoImageUrl} alt="logo"/> */}
  //                 <LazyLoadImage effect="blur" src={this.state.logoImageUrl}alt="logo"/>
  //               </div>
  //               <div className="logo-text col">Infinity Links</div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <div className="chat-bot">
  //           <ChatBot/>
  //         </div> */}
  //       </div>
  //     )
  //   }
  // }
}
function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default App
