import React from 'react'
import './App.css';
import logo from './images/sneaker_logo.png';
import sneaker1 from './images/sneaker_slide_1.png'
import sneaker2 from './images/sneaker_slide_2.png'
import sneaker3 from './images/sneaker_slide_3.png'
import NewShoes from "./components/NewShoes.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Carousel from 'react-bootstrap/Carousel'


  



class App extends React.Component {

state = {
  shoes: []
}

componentDidMount() {
  this.getNotices()
}
getNotices () {
  fetch('http://localhost:3000/shoes')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error))
}

handleAddRequest = (shoes) => {
  const copyShoes = [...this.state.shoes]
  copyShoes.unshift(shoes)
  this.setState({
    shoes: copyShoes,
    name: '',
    brand: '',
    year: '',
  })
}

  render() {
    console.log(this.state.shoes)
    return (
      <div>
        <nav>
        <h1 class="logo">Sneaker Head</h1>
        </nav>
        <Carousel>
          <Carousel.Item>
          <img fluid id="image_carasoul" className="d-block w-80"
              src={sneaker1}
              alt="First slide"/>
          </Carousel.Item>
          <Carousel.Item>
          <img fluid id="image_carasoul" className="d-block w-80"
              src={sneaker2}
              alt="Second slide"/>
          </Carousel.Item>
          <Carousel.Item>
          <img fluid id="image_carasoul" className="d-block w-80"
              src={sneaker3}
              alt="Third slide"/>
          </Carousel.Item>
        </Carousel>
        <NewShoes
    handleAddRequest={this.handleAddRequest}/>
    
    <CardDeck>
     {this.state.shoes.map(shoe => ( 
    <Card key={shoe.id}>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>{shoe.name}</Card.Title>
      <Card.Text>{shoe.brand}</Card.Text>
      <Card.Text>{shoe.year}</Card.Text>
      
    </Card.Body>
  </Card>
      ))}
      </CardDeck>
      
        
      </div>
    )
  }
}

export default App
