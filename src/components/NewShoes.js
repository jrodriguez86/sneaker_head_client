import React from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'




class NewShoes extends React.Component {
    state = {
        
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
          body: JSON.stringify({name: this.state.name, brand: this.state.brand, year: this.state.year}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then (res => res.json())
          .then (resJson => {
            this.props.handleAddRequest(resJson)
            this.setState({
              name: '',
              brand: '',
              year: ''
            })
        }).catch (error => console.error({'Error': error}))
      }
    
    
    render() {
            return (
              <div className="new_shoes_container">
              <Jumbotron>
                 <h1 className="comment-title">Add new Kicks to collection</h1>
               <Form onSubmit={this.handleSubmit}>
                 
                 <Form.Row>
                   <Form.Control className="newform" type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name" />
                   <Form.Control className="newform" type="text" id="comments" name="comments" onChange={this.handleChange} value={this.state.brand} placeholder="Brand" />
                   <Form.Control className="newform" type="text" id="location" name="location" onChange={this.handleChange} value={this.state.year} placeholder="Year" />
                   <br/><br/>
                   <Button type="submit" value="Submit">Add Kicks</Button>
              </Form.Row>
         

               </Form>  
               </Jumbotron>
               </div>
            )
        }
}

export default NewShoes