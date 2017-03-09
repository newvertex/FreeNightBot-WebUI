import React from 'react';
import * as mdb from './mdb';
import { Search } from 'semantic-ui-react';

class ImdbSearch extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      isLoading: false,
      results: [],
      value: '',
    };

    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: '',
    });
  }

  handleResultSelect(e, result) {
    this.setState({ value: result.title });
    mdb.get(result.key)
      .then((res) => {
        this.props.setMovie(res);
      })
  }

  handleSearchChange(e, value) {
    this.setState({
      isLoading: true,
      value,
    });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      if (this.state.value.length < 3) {
        this.setState({
          isLoading: false,
          results: [],
        });
      } else {
        mdb.search(this.state.value)
          .then((res) => {
            this.setState({
              isLoading: false,
              results: res,
            });
          });
      }

    }, 500)
  }

  render() {
    const { isLoading, results, value } = this.state;

    return (
      <Search
        minCharacters={3}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        fluid
        className="field"
      />
    );
  }

}

export default ImdbSearch;
