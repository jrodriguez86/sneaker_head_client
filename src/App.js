import React from 'react'
import NewShoes from "./components/NewShoes.js"



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
      <div className="App">
        <h1>SneakerHead</h1>
        <NewShoes
    handleAddRequest={this.handleAddRequest}/>
        

        
      </div>
    )
  }
}

export default App
