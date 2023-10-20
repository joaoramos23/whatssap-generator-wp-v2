import React, { useState } from 'react';
import Card from '../Card/Card';
import Select from 'react-select';
import './Form.scss';

const Form = () => {
  const [phoneState, setPhoneState] = useState('');
  const [messageState, setMessageState] = useState('');
  const [urlState, setUrlState] = useState('');
  const [copyState, setCopyState] = useState('Copiar Link');
  const [selectedCountryCode, setSelectedCountryCode] = useState({ value: '+55', label: 'Brasil (+55)' });

  const countryCodeOptions = [
    { value: '+1', label: 'Estados Unidos (+1)' },
    { value: '+1', label: 'Canadá (+1)' },
    { value: '+52', label: 'México (+52)' },
    { value: '+55', label: 'Brasil (+55)' },
    { value: '+57', label: 'Colômbia (+57)' },
    { value: '+1', label: 'Argentina (+54)' },
    { value: '+56', label: 'Chile (+56)' },
    { value: '+51', label: 'Peru (+51)' },
    { value: '+504', label: 'Honduras (+504)' },
    { value: '+503', label: 'El Salvador (+503)' },{ value: '+44', label: 'Reino Unido (+44)' },
    { value: '+33', label: 'França (+33)' },
    { value: '+49', label: 'Alemanha (+49)' },
    { value: '+39', label: 'Itália (+39)' },
    { value: '+31', label: 'Países Baixos (+31)' },
    { value: '+46', label: 'Suécia (+46)' },
    { value: '+34', label: 'Espanha (+34)' },
    { value: '+41', label: 'Suíça (+41)' },
    { value: '+7', label: 'Rússia (+7)' },
    // Adicione mais países americanos conforme necessário
];


  const handleSubmit = (e) => {
    e.preventDefault();
    const countryCode = selectedCountryCode ? selectedCountryCode.value : '';
    setUrlState(`https://api.whatsapp.com/send?phone=${countryCode}${phoneState}&text=${encodeURIComponent(messageState)}`);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopyState('Copiado!');
    setTimeout(() => {
      setCopyState('Copiar Link');
    }, 2000);
  };

  const clearAll = () => {
    setPhoneState('');
    setMessageState('');
    setUrlState('');
  };

  function renderResult(url) {
    return (
      <div className="col s12 result-wrapper">
        <span type="text" id="result" className="result" readOnly={!!urlState}>
          {urlState}
        </span>
        <hr />
        <br />
        <div className="row">
          <div className="col s12 m6">
            <button
              className="btn waves-effect waves-light teal button-handler"
              onClick={() => {
                copyToClipboard(urlState);
              }}
            >
              {copyState}
              <i className="material-icons right">content_copy</i>
            </button>
          </div>
          <div className="col s12 m6">
            <a className="btn waves-effect waves-light teal button-handler" href={url} target="a_blank">
              Enviar para WhatsApp
              <i className="material-icons right">open_in_new</i>
            </a>
          </div>
          <div className="col s12 m12">
            <button
              className="btn waves-effect waves-light teal accent-1 teal-text button-handler"
              onClick={() => {
                clearAll();
              }}
            >
              Limpar
              <i className="material-icons right">clear_all</i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="form-wrap">
        <form onSubmit={(e) => {
          handleSubmit(e);
        }}>
          <div className="row">
            <div className="input-field col s12">
              <h4>Gerador de Links para Whatsapp Chat2Desk</h4>
              <p className="teal-text margin-negative">
                Crie mensagens personalizadas no WhatsApp e envie para quem você quiser.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <Select
                value={selectedCountryCode}
                onChange={(selectedOption) => setSelectedCountryCode(selectedOption)}
                options={countryCodeOptions}
                placeholder="Selecione o DDD do país"
              />
            </div>
            <div className="input-field col s12">
              <input
                id="phone"
                name="phone"
                type="number"
                className="validate"
                value={phoneState}
                onChange={(e) => setPhoneState(e.target.value)}
                required
              />
              <label htmlFor="phone">Escreva seu número aqui 📱</label>
              <span className="helper-text">
                (DDD) 0 0000-0000 <span className="teal-text">Não se esqueça do prefixo.</span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="message"
                name="message"
                type="text"
                className="materialize-textarea validate"
                value={messageState}
                onChange={(e) => setMessageState(e.target.value)}
                required
              />
              <label htmlFor="message">Escreva sua mensagem aqui ✍️</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn waves-effect waves-light teal button-handler" type="submit">
                Gerar Link
                <i className="material-icons right">link</i>
              </button>
            </div>
            {urlState ? renderResult(urlState) : ''}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Form;
