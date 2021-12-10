import './styles/App.css';
import data from "./quotes.json";
import { useState } from 'react';

function App() {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  const getQuote = () => {
    let newQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
    if (newQuote.quote == text) getQuote();
    else {
      setAuthor(newQuote.author);
      setText(newQuote.quote);
      updateColor();
    }
  }

  const tweetQuote = (event) => {
    let href = 'https://twitter.com/intent/tweet?text="' + text + '"' + author + "&hashtags=quotes&related=freecodecamp";
    event.target.setAttribute("href", href);
  }

  const updateColor = () => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--main-color', color);
  }

  window.addEventListener("load", getQuote);

  return (
    <main className="main">
      <div id="quote-box">
        <p id="text" className='animate' key={Math.random()}>{text}</p>
        <p id="author" className='animate' key={Math.random()}>{author}</p>
        <div className="buttons">
          <a href="#" id="new-quote" onClick={getQuote}>New quote</a>
          <a href="https://twitter.com/intent/tweet"
            id="tweet-quote" target="_blank" onClick={tweetQuote}>tweet quote</a>
        </div>
      </div>
      <p className="profile-link">
        by <a href="#">Meric Gunduz</a>
      </p>
    </main>
  );
}
export default App;
