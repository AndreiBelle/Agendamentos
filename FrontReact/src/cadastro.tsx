import {useState} from 'react';
import { MainLayout } from './layouts/MainLayout';
import type { Agendamentos } from './interfaces/Agendamentos'
import { postAgendamentos } from './services/api';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';
import { Link } from 'react-router-dom';
import { notifier } from '../src/services/notifier'





export function AppCadastro() {
    const navigate = useNavigate();

    const [sala, setSala] = useState<boolean>(true);
    const [titulo, setTitulo] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [observacao, setObservacao] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');



    const envio =  async (e: React.SubmitEvent) => {
        e.preventDefault();

        const dados: (Omit<Agendamentos, 'id' | 'criado_em'>) = {
            sala: sala,
            titulo: titulo,
            responsavel: responsavel,
            observacao: observacao,
            inicio: new Date(inicio),
            fim: new Date(fim)
        }

        const resposta = await postAgendamentos(dados)

        if (resposta) {
            notifier.success("Cadastrado com sucesso!")
            navigate('/')
        }
    }

    return (
            <MainLayout>
                <form className="form"  onSubmit={envio}>
                    <h1 className='titulo-cadastro'>Cadastros de novos Agendamentos</h1>
                    <div className='dados'>
                        <label htmlFor='sala'>Selecione a sala: </label>
                        <select
                        id='sala'
                        value={sala.toString()}
                        onChange={(e) => setSala(e.target.value === 'true')}
                        >
                            <option value="true">Sala 12º</option>
                            <option value="false">Sala 13º</option>
                        </select>
                    </div>
                    <div className='dados'>
                        <label htmlFor='titulo'>Titulo da Runião</label>
                        <input 
                        id="titulo" 
                        type="text" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        placeholder='Ex: Reunião de alinhamento'
                        />
                    </div>
                    <div className='dados'>
                        <label htmlFor='responsavel'>Responsável pelo agendamento: </label>
                        <input
                        id='responsavel'
                        type="text"
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                        placeholder='Responsável pela reunião'
                        />  
                    </div>
                    <div className='dados'>
                        <label htmlFor='observacao'>Observações: </label>
                        <input
                        id='observacao'
                        type="text"
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        placeholder='Caso precise de café, bolachas, etc'
                        />
                    </div>
                    <div className='dados'>
                        <label htmlFor='inicio'>Inicio da reunião: </label>
                        <input
                        id='inicio'
                        type="datetime-local"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        />
                    </div>
                    <div className='dados'>
                        <label htmlFor='fim'>Fim da Reunião: </label>
                        <input
                        id='fim'
                        type="datetime-local"
                        value={fim}
                        onChange={(e) => setFim(e.target.value)}
                        />
                    </div>
                    <div className='div-cadastro'>
                        <button className="btn-cadastro" type='submit'>Cadastrar</button>
                    </div>
                    <Link className="btn-cancelar" to="/">Cancelar</Link>
                </form>
            </MainLayout>            
    )
}