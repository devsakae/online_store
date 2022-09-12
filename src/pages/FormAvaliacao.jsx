import React, { Component } from 'react';
import teste from 'prop-types';

export default class FormAvaliacao extends Component {
  state = {
    email: '',
    comentario: '',
    rating: '',
    temAvaliacoes: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const antesdevertemAvaliacoes = localStorage.getItem(id);
    const temAvaliacoes = JSON.parse(antesdevertemAvaliacoes);
    this.setState({ temAvaliacoes });
  }

  salvaLocal = (review) => {
    const { id } = this.props;
    const { temAvaliacoes } = this.state;
    if (temAvaliacoes) {
      const antesdevermaisAvaliacoes = [...temAvaliacoes, review];
      const maisAvaliacoes = JSON.stringify(antesdevermaisAvaliacoes);
      localStorage.setItem(id, maisAvaliacoes);
    } else {
      const advnaoTinhaAvaliacao = [review];
      const naoTinhaAvaliacao = JSON.stringify(advnaoTinhaAvaliacao);
      localStorage.setItem(id, naoTinhaAvaliacao);
    }
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, rating, comentario, temAvaliacoes } = this.state;
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
            onClick={ () => this.salvaLocal({ email, rating, comentario }) }
          >
            Enviar
          </button>
        </form>
        <div>
          { temAvaliacoes.map((rev, index) => (
            <div key={ index }>
              { rev.email }
              { ' ' }
              { rev.rating }
              { ' ' }
              { rev.comentario }
            </div>
          )) }
        </div>
      </div>
    );
  }
}

FormAvaliacao.propTypes = {
  id: teste.string,
}.isRequired;
