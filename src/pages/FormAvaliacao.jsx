import React, { Component } from 'react';
import teste from 'prop-types';

export default class FormAvaliacao extends Component {
  state = {
    email: '',
    comentario: '',
    id: '',
    avaliacao: [],
    rating: '',
  };

  componentDidMount() {
    const { id } = this.state;
    const avaliacao2 = localStorage.getItem({ id });
    const avaliacao = JSON.parse(avaliacao2);
    this.setState({ avaliacao });
  }

  salvaLocal = (review) => {
    const { id } = review;
    const avaliacao = JSON.stringify(review);
    localStorage.setItem(`${id}`, avaliacao);
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { id } = this.props;
    const { email, rating, comentario } = this.state;
    return (
      <div>
        <form>
          <label
            htmlFor="email"
          >
            Email
            <input
              data-testid="product-datail-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label
            htmlFor="comentario"
          >
            <textarea
              data-testid="product-detail-evaluation"
              name="comentario"
              id="comentario"
              value={ comentario }
              onChange={ this.onInputChange }
            />
          </label>
          <input
            data-testid="1-rating"
            name="rating"
            type="radio"
            value="1"
            onChange={ this.onInputChange }
          />
          1
          <input
            data-testid="2-rating"
            name="rating"
            type="radio"
            value="2"
            onChange={ this.onInputChange }
          />
          2
          <input
            data-testid="3-rating"
            name="rating"
            type="radio"
            value="3"
            onChange={ this.onInputChange }
          />
          3
          <input
            data-testid="4-rating"
            name="rating"
            type="radio"
            value="4"
            onChange={ this.onInputChange }
          />
          4
          <input
            data-testid="5-rating"
            name="rating"
            type="radio"
            value="5"
            onChange={ this.onInputChange }
          />
          5
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.salvaLocal({ email, rating, comentario, id }) }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

FormAvaliacao.propTypes = {
  id: teste.string,
}.isRequired;
