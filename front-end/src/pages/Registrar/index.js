import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import cep from '../../helpers/cep'
import estados from '../../helpers/estados'
import normalizarTelefone from '../../helpers/helpers.js'
import './styles.css'

import logoImg from '../../assets/logo.svg'

// import { Container } from './styles';

function Registrar() {

    const [mensagem, setMensagem] = useState(false || '')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [telefone, setTelefone] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [sexo, setSexo] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [cidade, setCidade] = useState('')
    const [cidades, setCidades] = useState([])
    const [uf, setUf] = useState('')
    const [validacao, setValidacao] = useState({})

    const history = useHistory()

    useEffect(() => {
        //     // Atualiza o titulo do documento usando a API do browser
        //     document.title = `Você clicou ${count} vezes`;
        //     console.log(response)
        if (mensagem) {
            alert(mensagem)
            setMensagem('')
        }

    },[mensagem])

    async function manipularCidades(uf) {
        await cep.get(`${uf}/subdistritos`).then(res => {
            setCidades(res.data)
        })
    }

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
            uf
        }

        try {
            var response = await api.post('usuario', data)
            setMensagem(`${response.data.mensagem}`)
            console.log(`${response.data.mensagem}`)
            setValidacao({})
            history.push('/')
            
        } catch ({ response }) {
            console.log(`Erro no cadastro, tente novamente.`, response)
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
                <form id="myform" onSubmit={manipularRegistro} >
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
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    // required
                    />
                    <span>{validacao.password ? validacao.password.message : null}</span>

                    <input
                        type="tel"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        onInput={e => normalizarTelefone(e)}
                    // required
                    />
                    <span>{validacao.telefone ? validacao.telefone.message : null}</span>
                    <input
                        type="tel"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        onInput={e => normalizarTelefone(e)}
                    // required
                    />
                    <span>{validacao.whatsapp ? validacao.whatsapp.message : null}</span>
                    <select

                        placeholder="Sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option disabled value="">Sexo</option>
                        <option value="Masculino" >Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>

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
                        <select style={{ width: 120 }}
                            placeholder="UF"
                            value={uf}
                            onChange={(e) => {
                                setUf(e.target.value)
                                manipularCidades(e.target.value)
                            }}
                        // required
                        >
                            <option value="">UF</option>
                            {estados.map((item, index) => (
                                <option key={index} value={item.sigla} >
                                    {item.sigla}
                                </option>
                            ))}

                        </select>
                        <span>{validacao.uf ? validacao.uf.message : null}</span>
                        <select
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        >
                            <option value="">Cidade</option>

                            {cidades.map((item, index) => (
                                <option key={index} value={item.nome} >
                                    {item.nome}
                                </option>
                            ))}
                            <option value="entorno">Entorno</option>
                            <option value="outros">Outros</option>

                        </select>
                        <span>{validacao.cidade ? validacao.cidade.message : null}</span>
                    </div>
                    <button color="primary" type="submit" className='button'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registrar