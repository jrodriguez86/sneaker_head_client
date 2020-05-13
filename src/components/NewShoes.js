import React from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'




class NewShoes extends React.Component {
    state = {
            image_url: '',
            name: '',
            brand: '',
            year: '',
        
    }
   
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
      }

      handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/shoes', {
          method: 'POST',
          body: JSON.stringify({image_url: this.state.image_url, name: this.state.name, brand: this.state.brand, year: this.state.year}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then (res => res.json())
          .then (resJson => {
            this.props.handleAddShoe(resJson)
            
            // this.setState({
            //   image_url: '',
            //   name: '',
            //   brand: '',
            //   year: ''
            // })
        }).then (() => {
          this.props.getShoes()
        })
        .catch (error => console.error({'Error': error}))
      }
    
    
    render() {
            return (
              <div className="new_shoes_container">
              
                 <h1 className="comment-title">Need to add new kicks?</h1>
               <Form onSubmit={this.handleSubmit}>
                 
                 <Form.Row>
                 <Form.Control className="newform" type="text" id="image_url" name="image_url" onChange={this.handleChange} value={this.state.image_url} placeholder="Add image link here" />
                   <Form.Control className="newform" type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name" />
                   <Form.Control className="newform" type="text" id="brand" name="brand" onChange={this.handleChange} value={this.state.brand} placeholder="Brand" />
                   <Form.Control className="newform" type="text" id="year" name="year" onChange={this.handleChange} value={this.state.year} placeholder="Year" />
                   <br/><br/>
                   <Button type="submit" value="Submit">Add Kicks</Button>
              </Form.Row>
         

               </Form>  
               
               </div>
            )
        }
}

export default NewShoes