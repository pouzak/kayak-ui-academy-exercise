import React, { Component } from 'react';
import style from './autocomplete.css';


class Autocomplete extends Component {
  state = {
    query: '',
    data: [],
    movie: ''
  }

 
  handleInputChange = () => {
    this.setState({
      query: event.target.value
    }, () => {
      if(this.state.query.length > 2){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query={${this.state.query}}&page=1&include_adult=false&limit=7`)
        .then(response => response.json())
        .then(response => this.setState({ data: response.results.splice(0, 7)}))
      } else {
        this.setState({ data:'' })
      }
    })
  }


  movieInfo(item){
   this.setState({
     query: item.title,
     data: '',
     movie: item
  })
  }


  render() {
    const movie = this.state.movie;
   const searchResults = this.state.data.length > 0 ? (
     this.state.data.map(item => {
       return (
         <div className={style.listcontainer}>
          <ul className={style.list}>
            <li onClick={() => this.movieInfo(item)}>
              <p className={style.listtitle}>{item.title}</p>
              <p className={style.listmovie}>{item.vote_average} rating, {item.release_date.substring(0, 4)}</p>
            </li>
          </ul>
         </div>
       )
     })
   ) : null


   const movieInfo = movie ? (
     <div className={style.movieInfo}>
       <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}/>
        <div className={style.movieInfoCont}>
          <h2>{movie.original_title}</h2>
          <h3>{movie.vote_average + '/10'}</h3>
          
          <hr/>
          <p>Total votes: {movie.vote_count}</p>
          <p>Release date: {movie.release_date}</p>
          
          <hr/>
          <p className={style.movieoverview}>"{movie.overview}"</p>
          </div>
     </div>
   ) : (<div className={style.main}>
          <h2>Autocomplete Search</h2>
        </div>)


    return (
      <div>
        <div className={style.navbar}>
          <div className={style.container}>
              <input placeholder={"Enter movie title, e.g Rambo III"}
              value={this.state.query}
              onChange={this.handleInputChange}
              />
              {searchResults}
          </div>
        </div>
        <div className={style.container}>
          {movieInfo}
        </div>
      </div>
    )
  }
}

export default Autocomplete;
