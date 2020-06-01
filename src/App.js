import React from 'react'
import './App.css';
// import logo from './images/sneaker_logo.png';
import sneaker1 from './images/sneaker_slide_1.png'
import sneaker2 from './images/sneaker_slide_2.png'
import sneaker3 from './images/sneaker_slide_3.png'
import NewShoes from "./components/NewShoes.js"
import UpdateShoeModal from './components/UpdateShoes.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'





class App extends React.Component {

state = {
  shoes: [],
  show: false,
  setShow: false,
}

componentDidMount() {
  this.getShoes()
}
getShoes = () => {
  fetch('https://sneaker-head-4.herokuapp.com/')
    .then(response => response.json())
    .then(json => this.setState({shoes: json.shoes},() => console.log(this.state.shoes)))
    .catch(error => console.error(error))
}

handleAddShoe = (shoes) => {
  const copyShoes = [...this.state.shoes]
  copyShoes.unshift(shoes)
  this.setState({
    shoes: copyShoes,
    image_url: '',
    name: '',
    brand: '',
    year: '',
  })
}

handleEditShoe = (data) => {
  const newData = this.state.shoes.filter( shoe => {
    return shoe._id !== data._id
  })
  newData.push(data);
  this.setState({ 
    shoes: newData,
    show: false
  })
}



//for edit route
getEditShoe = (shoe) => {
  this.setState({shoe, getEditShoeActive: false, getEditShoeActive: true, show: true})
}

handleClose = () => {
  this.setState({show: false})
}

handleDelete = (deletedShoe) => {
  fetch(`https://sneaker-head-4.herokuapp.com//${deletedShoe.id}`, {
     method: 'DELETE',
     headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
     }
   })
 .then(json => {
   const shoes = this.state.shoes.filter((shoe) => shoe.id !== deletedShoe.id)
   this.setState({shoes})
 })
 .catch(error => console.log(error))
}



  render() {
    console.log(this.state.shoes)
    return (
      <>
        <nav>
        <h1 className="logo">Sneaker Head</h1>
        </nav>
        {/* <ShoeCarasoul /> */}
        <Carousel>
          <Carousel.Item>
          <img fluid="true" id="image_carasoul" className="d-block w-80"
              src={sneaker1}
              alt="First slide"/>
              <Carousel.Caption>
      <h3>Nike Dunk SB Low Paris</h3>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img fluid="true" id="image_carasoul" className="d-block w-80"
              src={sneaker2}
              alt="Second slide"/>
              <Carousel.Caption>
      <h3>adidas Yeezy Boost 700 Wave Runner</h3>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img fluid="true" id="image_carasoul" className="d-block w-80"
              src={sneaker3}
              alt="Third slide"/>
              <Carousel.Caption>
      <h3>Louis Vuitton Jaspers Kanye Patchwork</h3>
              </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <NewShoes
    handleAddShoe={this.handleAddShoe}
    getShoes={this.getShoes}/>
    
    <CardGroup>
      <div className="card-row" >
    {this.state.shoes.map(shoe => { return (
      
    <Card key={shoe.id} className="card">
    <Image variant="top" src={shoe.image_url} thumbnail />
    <Card.Body className="card_text">
      <Card.Title>{shoe.name}</Card.Title>
      <Card.Text>{shoe.brand}</Card.Text>
      <Card.Text>{shoe.year}</Card.Text>
    </Card.Body>
    <Button className="Edit-Button" govariant="primary" handleSubmit={this.handleSubmit} onClick={() => {this.getEditShoe(shoe)} }>Edit</Button>
    <br />
      <Button variant="secondary" className="Delete-Button" onClick={() => this.handleDelete(shoe)}>Delete</Button>
  </Card>
 
      )})} 
      </div>
      <br />
      </CardGroup>
      
      {this.state.getEditShoeActive ? <UpdateShoeModal shoe={this.state.shoe} showUp={this.state.show}  hideModal={this.handleClose} handleEditShoe={this.handleEditShoe}/> : null} 
      </>
    )
    
  }
}

export default App
