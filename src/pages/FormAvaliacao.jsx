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
      this.setState({
        temAvaliacoes: [...temAvaliacoes, maisAvaliacoes],
      });
    } else {
      const advnaoTinhaAvaliacao = [review];
      const naoTinhaAvaliacao = JSON.stringify(advnaoTinhaAvaliacao);
      localStorage.setItem(id, naoTinhaAvaliacao);
      this.setState({
        temAvaliacoes: [...temAvaliacoes, naoTinhaAvaliacao],
      });
    }
    this.setState({
      email: '',
      comentario: '',
      rating: '',
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validacao = () => {
    const { email, rating, comentario } = this.state;
    return !(email.length > 0 && rating.length > 0 && comentario
      .length > 0 && email.includes('@'));
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
              data-testid="product-detail-email"
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
          {
            this.validacao() ? (<p data-testid="error-msg">Campos inválidos</p>)
              : (
                <p>
                  <button
                    data-testid="submit-review-btn"
                    type="submit"
                    onClick={ () => this.salvaLocal({ email, rating, comentario }) }
                  >
                    Enviar
                  </button>
                </p>
              )
          }
        </form>
        <div>
          { temAvaliacoes && temAvaliacoes.map((rev, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{ rev.email }</p>
              { ' ' }
              <p data-testid="review-card-rating">{ rev.rating }</p>
              { ' ' }
              <p data-testid="review-card-evaluation">{ rev.comentario }</p>
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
