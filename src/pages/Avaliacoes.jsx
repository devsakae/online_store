import React, { Component } from 'react';
import teste from 'prop-types';

export default class Avaliacoes extends Component {
  state = {
    temAvaliacoes: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const antesdevertemAvaliacoes = localStorage.getItem(id);
    const temAvaliacoes = JSON.parse(antesdevertemAvaliacoes);
    this.setState({ temAvaliacoes });
  }

  render() {
    const { temAvaliacoes } = this.state;
    return (
      <div id="ESTOUAQUI">
        { temAvaliacoes.map((rev, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{ rev.email }</p>
            <p data-testid="review-card-rating">{ rev.rating }</p>
            <p data-testid="review-card-evaluation">{ rev.text }</p>
          </div>
        )) }
      </div>
    );
  }
}

Avaliacoes.propTypes = {
  temAvaliacoes: teste.shape({}),
}.isRequired;
