import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPower, FiEdit3 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'


// import { Container } from './styles';

function Profile() {
    const [profile, setProfile] = useState([])
    const sessao = JSON.parse(localStorage.getItem('logon'))

    useEffect(() => {
        listarGps(sessao.token, setProfile)
    }, [sessao.token])

    async function listarGps(token, callback) {
        try {
            const response = await api.get('/lista', { headers: { Authorization: token } })
            callback(response.data.data)
        } catch (e) {
            console.log(`😱 Requisição a api falhou: ${e}`);
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="GPSdf" />
                <span>Seja bem-vindo, {sessao ? sessao.usuario.usuario : 'faça seu cadastro.'}</span>

                <Link className="button" to="/anuncio/novo">Cadastrar novo Anúncio</Link>
                <button type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Anúncios cadastrados</h1>

            <ul>
                {
                    profile.map((gps) => (
                        <li key={gps._id} >
                            <strong>ID:</strong>
                            <p>{gps._id}</p>

                            <button type="button">
                                <FiEdit3 size={20} color="#08a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Profile