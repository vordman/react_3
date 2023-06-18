import React from "react";
import axios from "axios";
import Movie from "./Movie"
import "./App.css"


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("hello");
  }

  state = {
    isLoading: true,
    count: 0,
    movies: []
  }
  add = () => {
    console.log("add")
    this.setState(current => ({ count: current.count + 1 })); {/*외부 의존 X / count: this.state.count +1*/ }
  };
  minus = () => {
    console.log("minus")
    this.setState({ count: this.state.count - 1 })
  };
  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
    console.log(movies);
    this.setState({ movies: movies, isLoading: false })
  }
  componentDidMount() {
    this.getMovies();
    setTimeout(() => {
      this.setState({ isLoading: false });

    }, 1000)
  }
  componentDidUpdate() {
    console.log("1233")
  }
  componentWillUnmount() {
    console.log("goodbye");
  }
  render() {
    const { isLoading, movies } = this.state;
    console.log("rendering")
    return <div>
      <h1>
        The number is: {this.state.count}
      </h1>
      <button onClick={this.add}>Add</button>
      <button onClick={this.minus}>Minus</button>
      <section className="container">
        {isLoading ? <div className="loader">
          <span className="loader__text">Loading</span>
        </div> : <div className="movies">
          {movies.map(movie => (
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres} />
        ))}
        </div>
  }</section>
    </div>
  }
}

export default App;