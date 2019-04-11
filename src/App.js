import React, { Component } from 'react'
import ReactDOM from "react-dom"
import Header from './components/ui/Header/Header'
import ListObject from './components/ListObject';
import FormComponent from './components/FormComponent';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: "",
      author: "",
      apiKey: "",
      isHidden: false,
      hideBooks: false
    }
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleBookList = () =>{
    this.setState({
      hideBooks: !this.state.hideBooks
    })
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

  fastPageReload() {
    window.location.reload();
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
    window.alert("Book is saved.");
    window.location.reload();
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

  render() {
    const showOrHideBookList = !this.state.hideBooks && <ListObject apiKey={this.state.apiKey} books={this.state.books}
    />
      const formIsHidden = this.state.isHidden ? "Show input form" : "Hide input form";
      const bookListIsHidden = this.state.hideBooks ? "Show booklist" : "Hide booklist"
    return (
      <div className="App">
        <Header />

        <button className="toggleButton" onClick={this.toggleHidden} >
          {formIsHidden}
        </button>

        {!this.state.isHidden && <FormComponent
          title={this.state.title}
          author={this.state.author}
          handleInput={this.handleInput}
          handleOnClick={this.handleOnClick}
          />}

          <br />
          <button className="toggleButton" onClick={this.toggleBookList}>
            {bookListIsHidden}
          </button>

        {showOrHideBookList}
      </div>
    )
  }
}

export default App
