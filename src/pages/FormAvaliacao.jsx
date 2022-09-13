import React, { Component } from 'react';
import teste from 'prop-types';
import Avaliacoes from './Avaliacoes';

export default class FormAvaliacao extends Component {
  state = {
    email: '',
    text: '',
    rating: '',
    temAvaliacoes: [],
    camposInvalidos: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const antesdevertemAvaliacoes = localStorage.getItem(id);
    const temAvaliacoes = JSON.parse(antesdevertemAvaliacoes);
    this.setState({ temAvaliacoes, camposInvalidos: false });
  }

  salvaLocal = (review) => {
    const { id } = this.props;
    const { email, rating, temAvaliacoes } = this.state;
    if (email.length > 0 && rating.length > 0 && email
      .includes('@') && email.endsWith('.com')) {
      if (temAvaliacoes) {
        const antesdevermaisAvaliacoes = [...temAvaliacoes, review];
        const maisAvaliacoes = JSON.stringify(antesdevermaisAvaliacoes);
        localStorage.setItem(id, maisAvaliacoes);
        this.setState((prevState) => ({
          temAvaliacoes: [...prevState.temAvaliacoes, maisAvaliacoes],
          email: '',
          text: '',
          rating: '',
        }));
      } else {
        const advnaoTinhaAvaliacao = [review];
        const naoTinhaAvaliacao = JSON.stringify(advnaoTinhaAvaliacao);
        localStorage.setItem(id, naoTinhaAvaliacao);
        this.setState({
          temAvaliacoes: [naoTinhaAvaliacao],
          email: '',
          text: '',
          rating: '',
        });
      }
    } else this.setState({ camposInvalidos: true });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, rating } = this.state;
      if (email.length > 0 && rating.length > 0 && email
        .includes('@') && email.endsWith('.com')) {
        this.setState({ camposInvalidos: false });
      }
    });
  };

  render() {
    const { email, rating, text, temAvaliacoes, camposInvalidos } = this.state;
    const { id } = this.props;
    return (
      <div>
        <form>
          <label
            htmlFor="email"
          >
            Email
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label
            htmlFor="text"
          >
            <textarea
              data-testid="product-detail-evaluation"
              name="text"
              id="text"
              value={ text }
              onChange={ this.onInputChange }
            />
          </label>
          <input
            data-testid="1-rating"
            name="rating"
            type="radio"
            value="1"
            checked={ rating === '1' }
            onChange={ this.onInputChange }
          />
          1
          <input
            data-testid="2-rating"
            name="rating"
            type="radio"
            value="2"
            checked={ rating === '2' }
            onChange={ this.onInputChange }
          />
          2
          <input
            data-testid="3-rating"
            name="rating"
            type="radio"
            value="3"
            checked={ rating === '3' }
            onChange={ this.onInputChange }
          />
          3
          <input
            data-testid="4-rating"
            name="rating"
            type="radio"
            value="4"
            checked={ rating === '4' }
            onChange={ this.onInputChange }
          />
          4
          <input
            data-testid="5-rating"
            name="rating"
            type="radio"
            value="5"
            checked={ rating === '5' }
            onChange={ this.onInputChange }
          />
          5
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ () => this.salvaLocal({ email, rating, text }) }
          >
            Enviar
          </button>
          { camposInvalidos && (<p data-testid="error-msg">Campos inválidos</p>) }
          { temAvaliacoes && (<Avaliacoes
            id={ id }
          />) }
        </form>
      </div>
    );
  }
}

FormAvaliacao.propTypes = {
  id: teste.string,
}.isRequired;
