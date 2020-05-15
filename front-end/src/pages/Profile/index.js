import React from 'react'
import { Link } from 'react-router-dom'
import { FiPower, FiEdit3 } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'


// import { Container } from './styles';

function Profile() {
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="GPSdf" />
                <span>Seja bem-vindo, EDUARDO</span>
                
                <Link className="button" to="/anuncio/novo">Cadastrar novo Anúncio</Link>
                <button type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Anúncios cadastrados</h1>

            <ul>
                <li>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <button type="button">
                        <FiEdit3 size={20} color="#08a8b3" />
                    </button>
                </li>
                <li>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <button type="button">
                        <FiEdit3 size={20} color="#08a8b3" />
                    </button>
                </li>
                <li>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <button type="button">
                        <FiEdit3 size={20} color="#08a8b3" />
                    </button>
                </li>
                <li>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <strong>NOME:</strong>
                    <p>Nome Teste</p>
                    <button type="button">
                        <FiEdit3 size={20} color="#08a8b3" />
                    </button>
                </li>
                
            </ul>
        </div>
    )
}

export default Profile