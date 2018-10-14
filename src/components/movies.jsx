import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    return (
      <React.Fragment>
        <h2>{this.getNumberOfMovies()}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(eachMovie => this.getMovieRow(eachMovie))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  getNumberOfMovies = () => {
    const count = this.state.movies.length;
    return count === 0
      ? "There are no movies"
      : "There are " + count + " movies in the database.";
  };

  handleDelete = movieId => {
    const moviesUpdated = this.state.movies.filter(
      movie => movie._id !== movieId
    );
    this.setState({
      movies: moviesUpdated
    });
  };

  handleLike = movieObject => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movieObject);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getMovieRow = movieObject => {
    const {
      _id,
      title,
      genre,
      numberInStock: stock,
      dailyRentalRate: rate
    } = movieObject;
    return (
      <tr key={_id}>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{stock}</td>
        <td>{rate}</td>
        <td>
          <Like
            liked={movieObject.liked}
            onClick={() => this.handleLike(movieObject)}
          />
        </td>
        <td>
          <button
            className="btn btn btn-danger"
            onClick={() => this.handleDelete(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
}

export default Movies;
