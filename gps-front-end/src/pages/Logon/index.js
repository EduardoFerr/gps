import React from 'react'
import { FiLogIn, FiHelpCircle } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="GPSdf" />
                <form>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Usuário" />
                    <input placeholder="Senha" type="password" />
                    <button className="button" type="submit">Entrar</button>

                    <a href="/recuperar">
                        <FiHelpCircle size={16} color="#e02041" />
                        Esqueceu sua senha
                    </a> | <a href="/registrar">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </a>
                </form>
            </section>

            <img src={heroesImg} alt="GPSdf" />
        </div>
    )
}

export default Logon