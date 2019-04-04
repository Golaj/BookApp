import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import ListItem from './components/ListItem';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: "",
      author: "",
      apiKey: ""
    }
  }

  async componentDidMount() {
    const key = await this.getApiKey();
    console.log(key);
      fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" + key)
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log(data);
        })
      
  }

  getApiKey(){
    const key = localStorage.getItem("apiKey");
    if(!key){
      return fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey")
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          localStorage.setItem("apiKey", data.key)
          return data.key;
        })
      } else {
        return key;
      }
  }

  handleTitleInput(e) {
    this.setState({
      title: e.target.value
    })
  }

  // skapa handle author input

  handleApiRequest = data => {
    this.setState({
      apiKey: data
    })
    
  }
componentDidUpdate(){
  console.log(this.state.apiKey)
}

// books = [...books, {id , author, title}]

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row form-section">
            <form className="book-form col-6">
              <legend>Lägg till dina favoritböcker</legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                  onChange={this.handleTitleInput}
                />
               
               
                <input // skapa en lyssnare onChange på skapad handleAuthorInput
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                />
              </div>
              <button /* fetch url med queryString title och author.
              Om success spara in till books(lista) med title, author och id (från json Objekt);
              */
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Skicka
              </button>
            </form>
          </div>
        </div>
        <div className="display-books">
          <div className="container">
            <div className="col-12">
              <ul className="list-group">
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <div className="author">Författare</div>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li>
                <ListItem />
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
