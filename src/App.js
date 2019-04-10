import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import ListObject from './components/ListObject';
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

async loadBooks() {
    const key = await this.getApiKey();
    const setBooks = (books) => this.setState({
      books
    })
    fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" + key)
      .then(function (response) {
        return response.json();
      }).then(function ({ status, data }) {
        if (status === "error") {
          this.loadBooks();
        }
        console.log(data);
        setBooks(data)
      })
  }

  componentDidMount() {
    this.loadBooks();
  }

  getApiKey() {
    const key = localStorage.getItem("apiKey");
    if (!key) {
      return fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey")
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          localStorage.setItem("apiKey", data.key)
          this.handleApiKey(data.key);
          return data.key;
        })
    } else {
      this.handleApiKey(key);
      return key;
    }
  }

  handleTitleInput = event => {
    this.setState({
      title: event.target.value
    })
  }

  handelAuthorInput = event => {
    this.setState({
      author: event.target.value
    })
  }

  handleApiKey = data => {
    this.setState({
      apiKey: data
    })
  }

  handleBookInput = id => {
    let setTitle = this.state.title;
    let setAuthor = this.state.author;
    this.setState({
      books: [...this.state.books, { id, setTitle, setAuthor }]
    })
  }

  handleOnClick = event => {
    const bookInputter = this.handleBookInput;
    event.preventDefault();
    fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key="
      + this.state.apiKey + "&title=" + this.state.title + "&author=" + this.state.author)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === "success") {
          bookInputter(data.id);
        }
      })
  }

  componentDidUpdate() {
    console.log(this.state.apiKey);
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


                <input
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                  onChange={this.handelAuthorInput}
                />
              </div>
              <button
                onClick={this.handleOnClick}
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
              <ListObject books={this.state.books} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
