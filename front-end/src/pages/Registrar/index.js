import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

// import { Container } from './styles';

function Registrar() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [sexo, setSexo] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [cidade, setCidade] = useState('')
    // const [uf, setUf] = useState('')
    const [validacao, setValidacao] = useState({})

    async function manipularRegistro(e) {
        e.preventDefault()

        const data = {
            nome,
            email,
            telefone,
            whatsapp,
            sexo,
            nascimento,
            cidade,
            // uf
        }

        try {
            var response = await api.post('usuario', data)

            console.log(`${response.data.mensagem}`)
        } catch ({ response }) {
            console.log(`Erro no cadastro, tente novamente.`)
            // console.log(response.data.mensagem)
            console.log(response.data.erro.errors)
            setValidacao(response.data.erro.errors)
        }
    }

    return (
        <div className="registrar-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="GPSdf" />

                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro para publicar e ter acesso aos nossos serviços.</p>

                    <Link to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={manipularRegistro}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    // required
                    />
                    <span>{validacao.nome ? validacao.nome.message : null}</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    // required
                    />
                    <span>{validacao.email ? validacao.email.message : null}</span>

                    <input
                        type="tel"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    // required
                    />
                    <span>{validacao.telefone ? validacao.telefone.message : null}</span>
                    <input
                        type="tel"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    // required
                    />
                    <span>{validacao.whatsapp ? validacao.whatsapp.message : null}</span>
                    <input
                        placeholder="Sexo"
                        value={sexo}
                        onChange={e => setSexo(e.target.value)}
                    // required
                    />
                    <span>{validacao.sexo ? validacao.sexo.message : null}</span>
                    <input
                        type="date"
                        placeholder="Nascimento"
                        value={nascimento}
                        onChange={e => setNascimento(e.target.value)}
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                    // required
                    />
                    <span>{validacao.nascimento ? validacao.nascimento.message : null}</span>
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}

                        />
                        <span>{validacao.cidade ? validacao.cidade.message : null}</span>

                        {/* <select style={{ width: 80 }}
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        /> */}
                        {/* <span>{validacao.uf ? validacao.uf.message : null}</span> */}

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Registrar