import React from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class UpdateShoeModal extends React.Component {


  
  handleSubmit = (event) => {
    
      //send the data to the server
      fetch('http://localhost:3000/shoes/' + this.props.shoe._id, {
          method: 'PUT',
          body: JSON.stringify({
              image_url: this.state.image_url,
              name: this.state.name,
              brand: this.state.comments,
              year: this.state.year
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      //the server then responds with json
      .then (res => res.json())
      .then (resJson => {
          //add the received data to state in app
          this.props.handleEditRequest(resJson)
          this.setState({image_url: '', name: '', brand: '', year: ''})
      }).catch (error => console.error({'Error': error}))
  }
  
  handleChange = (event) => {
      this.setState({[event.target.id]: event.target.value})
  }
    render () {
      return (

        <>
        <Modal centered="true"  show={this.props.showUp}  onHide={this.props.hideModal} className="modalText">
           
             <ModalDialog>
             <ModalHeader closeButton >
                    <ModalTitle className="titleText">
                        What are we changing?
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <Form onSubmit={this.hideModal}>
            <Form.Row>
            <Form.Label className="titleText">Image Link</Form.Label>
              <Form.Control
                type="text"
                id="image_url"
                defaultValue={this.props.shoe.image_url}
                onChange={this.handleChange}
              />
              <Form.Label className="titleText">Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                defaultValue={this.props.shoe.name}
                onChange={this.handleChange}
              />
              <Form.Label className="titleText">Brand</Form.Label>
              <Form.Control
                type="text"
                id="brand"
                defaultValue={this.props.shoe.brand}
                onChange={this.handleChange}
              />
              <Form.Label className="titleText">Year</Form.Label>
              <Form.Control
                type="text"
                id="location"
                defaultValue={this.props.shoe.year}
                onChange={this.handleChange}
              />
              </Form.Row>
            </Form>
            <ModalFooter >
              
                    
              <Button onClick={this.handleSubmit}>Update Kicks</Button>
              <Button onClick={this.props.hideModal}>Close</Button>
            </ModalFooter>
            </ModalBody>
            </ModalDialog>
          </Modal>
          <br/><br/><br/>
        </>
      )
    }
}

export default UpdateShoeModal