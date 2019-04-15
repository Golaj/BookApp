import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import ListObject from './components/ListObject';
import FormComponent from './components/FormComponent';

const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: "",
      author: "",
      apiKey: "",
      isHidden: false,
      hideBooks: false,
    }
  }   

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleBookList = () => {
    this.setState({
      hideBooks: !this.state.hideBooks
    })
  }

  setBooks = data => {
    this.setState({
      books: data.data,
      title: "",
      author: ""
    })
  }

  request(target, fn, limit = 10) {
    fetch(target)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          fn(data)
          this.setState({ books : [...this.state.books] })  /* Den här raden ger ett outgrundligt error.
           Den säger att det inte är en metod. Även det enligt vår kunskap är en korrekt skriven metod.
           Requestanropet går igenom. Ändringen som vill genomföras är genomgjord efter en page refresh*/
        } else if (limit > 0) {
          this.request(target, fn, limit - 1)
        } else {
          console.log("Error has occured")
        }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getApiKey();
    this.setUp();
  }

 setUp() {
    const bookLoader = this.setBooks;
    const key = this.getApiKey();
    this.request((url + "op=select&&key=" + key), bookLoader)
  }

  getApiKey(limit = 10) {
    let key = localStorage.getItem("apiKey");
    const setKey = this.handleApiKey;
    if (!key) {
      fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey")
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.status === "error") {
            if(limit > 0)
            this.getApiKey(limit -1);
          } else {
            console.log("An error occured")
          }
          localStorage.setItem("apiKey", data.key)
          key = data.key;
        })
    }
    setKey(key)
    return key;
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

  handleBookInput = data => {
    let id = data.id;
    let setTitle = this.state.title;
    let setAuthor = this.state.author;
    this.setState({
      books: [...this.state.books, { id, setTitle, setAuthor }]
    })
    window.alert("Book is saved.");
    this.setUp();
  }
  
  handleOnClick = event => {
    const bookInputter = this.handleBookInput;
    event.preventDefault();
    this.request((url + "op=insert&key=" + this.state.apiKey
      + "&title=" + this.state.title
      + "&author=" + this.state.author), bookInputter)
  }

  render() {
    const showOrHideBookList = !this.state.hideBooks && <ListObject
      apiKey={this.state.apiKey}
      books={this.state.books}
      request={this.request}
      reload={this.setUp}
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