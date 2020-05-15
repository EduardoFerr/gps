import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

function NovoAnuncio() {
    return (<div className="novo-anuncio-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="GPSdf" />

                <h1>Cadastrar novo anúncio</h1>
                <p>Descreva seu anúncio detalhadamente</p>

                <Link to="/profile">
                    <FiArrowLeft size={16} color="#e02041" />
                    Voltar para o início
                </Link>
            </section>

            <form>
                <input placeholder="Nome" />
                <input placeholder="Idade" />
                <input placeholder="Orientação" />
                <input placeholder="Gênero" />
                <textarea placeholder="Descrição" />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>)
}

export default NovoAnuncio