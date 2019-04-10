import React, { Component } from 'react'
import ReactDOM from "react-dom"
import Header from './components/ui/Header/Header'
import ListObject from './components/ListObject';
import ButtonComponent from './components/ButtonComponent';

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

  setBooks = data => {
    this.setState({
      books: data
    })
  }

  refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  startErrorCounter() {
    const counter = sessionStorage.getItem("errorCounter")
    if (!counter) {
      sessionStorage.setItem("errorCounter", 1);
    }
  }

  async componentDidMount() {
    const key = await this.getApiKey();
    const bookLoader = this.setBooks;
    const reloader = this.refreshPage;
    this.startErrorCounter();
    const counter = parseInt(sessionStorage.getItem("errorCounter"));
    console.log(key);
    fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" + key)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === "error") {
          if (counter < 10) {
            reloader();
            console.log(counter + " errors has occured. Page will soon reload, have patience young padawan.")
            sessionStorage.setItem("errorCounter", counter + 1)
          } else {
            ReactDOM.render(<h1>Im am very sorry, but there has been to many errors. Please try again.</h1>,
              document.getElementById("root"))
          }
        } else {
          sessionStorage.setItem("errorCounter", 1)
        }
        console.log(data);
        bookLoader(data.data);
      })
  }

  getApiKey() {
    const key = localStorage.getItem("apiKey");
    const setKey = this.handleApiKey;
    if (!key) {
      return fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey")
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          localStorage.setItem("apiKey", data.key)
          setKey(data.key)
          return data.key;
        })
    } else {
      setKey(key)
      return key;
    }
  }
  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
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
    this.handleClearOnClick();
  }

  handleClearOnClick = event => {
    this.setState({
      title: "",
      author: ""
    })
  }

  handleOnClick = event => {
    const bookInputter = this.handleBookInput;
    let books = this.state.books;
    let title = this.state.title;
    let author = this.state.author;
    event.preventDefault();
    fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key="
      + this.state.apiKey + "&title=" + this.state.title + "&author=" + this.state.author)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === "success") {
          console.log(data)
          bookInputter(data.id);
          console.log(books + " " + title + " " + author)
        }
      })
  }

  componentDidUpdate() {
    console.log(this.state.apiKey);
  }

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
                  name="title"
                  value={this.state.title}
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                  onChange={this.handleInput}
                />


                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={this.state.author}
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                  onChange={this.handleInput}
                />

              </div>
              <ButtonComponent handleOnClick={this.handleOnClick} />
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
