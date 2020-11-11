import React, { Component } from 'react';
import Todos from '../../Containers/Todos/Todos';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Button from '../../Components/common/button';
import NavBar from '../../Containers/Navbar/Navbar';

class DashBoard extends Component {
  constructor() {
    super();

    this.state = {
      searchText: ' ',
      showSearchResult: false,
      display: 'all',
    };
  }

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
    if (this.state.searchText) {
      this.setState({
        showSearchResult: true,
      });
    }
  };

  setDisplay = (display) => {
    this.setState({
      display: display,
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <section className="todos">
          <div className="container clearfix">
            <div className="display-buttons">
              <Button
                className={`${this.state.display === 'all' ? 'active' : ''}`}
                onClick={() => this.setDisplay('all')}
              >
                All
              </Button>
              <Button
                className={`${
                  this.state.display === 'completed' ? 'active' : ''
                }`}
                onClick={() => this.setDisplay('completed')}
              >
                Completed
              </Button>
              <Button
                className={`${
                  this.state.display === 'incomplete' ? 'active' : ''
                }`}
                onClick={() => this.setDisplay('incomplete')}
              >
                Incomplete
              </Button>
            </div>
            <SearchBar handleChange={this.handleChange} />
            <Todos
              display={this.state.display}
              show={this.state.showSearchResult}
              searchText={this.state.searchText}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default DashBoard;
