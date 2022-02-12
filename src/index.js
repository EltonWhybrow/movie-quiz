import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import MovieQuiz from './MovieQuiz';
import AddActorForm from './AddActorForm';
import reportWebVitals from './reportWebVitals';
import { shuffle, sample } from 'underscore';

const actors = [
  {
    name: 'Robert DeNiro',
    imageUrl: 'images/actors/robertdeniro.jpeg',
    imageSource: 'Wikimedia Commons',
    movies: ['Casino', 'Goodfellas', 'Raging Bull ']
  },
  {
    name: 'Matthew Perry',
    imageUrl: 'images/actors/matthewperry.jpeg',
    imageSource: 'Wikimedia Commons',
    movies: ['Fools rush in', 'The whole nine yards']
  },
  {
    name: 'Jennifer Aniston',
    imageUrl: 'images/actors/jenniferaniston.jpeg',
    imageSource: 'Wikimedia Commons',
    movies: ['Just go with it', 'Murder Mystery', 'We\'re the Millers']
  },
  {
    name: 'Madonna',
    imageUrl: 'images/actors/madonna.jpeg',
    imageSource: 'Wikimedia Commons',
    movies: ['Evita', 'Who\'s that girl']
  },
  {
    name: 'Micheal jackson',
    imageUrl: 'images/actors/michaeljackson.jpeg',
    imageSource: 'Wikimedia Commons',
    movies: ['This is it', 'The Wiz', 'Moonwalker']
  }
];

function getTurnData(actors) {
  const allMovies = actors.reduce(function (p, c, i) {
    return p.concat(c.movies);
  }, []);
  const fourRandomMovies = shuffle(allMovies).slice(0, 4);
  const answer = sample(fourRandomMovies);

  return {
    movies: fourRandomMovies,
    actor: actors.find((actor) =>
      actor.movies.some((title) =>
        title === answer))
  }
}

function resetState() {
  return {
    turnData: getTurnData(actors),
    highlight: ''
  };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.actor.movies.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return <MovieQuiz {...state}
    onAnswerSeleted={onAnswerSelected}
    onContinue={() => {
      state = resetState();
      render();
    }} />;

};

function ActorWrapper() {
  const navigate = useNavigate();
  return <AddActorForm onAddActor={(actor) => {
    actors.push(actor);
    navigate("/");

  }} />
}

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/add" element={<ActorWrapper />} />
      </Routes>
    </BrowserRouter>, document.getElementById('root')
  );
}
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
