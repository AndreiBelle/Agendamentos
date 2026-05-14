import { useEffect, useState} from 'react';
import type { Agendamentos } from './interfaces/Agendamentos';
import { getAgendamentos } from './services/api';
import { deleteAgendamentos } from './services/api';
import { MainLayout } from './layouts/MainLayout';
import { notifier } from '../src/services/notifier'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function App() {
  const [agendamentos, setAgendamentos] = useState<Agendamentos[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null);
  const [senha, setSenha] = useState('');

  const SENHA_CORRETA = "Admin123."

  const abrirConfirm = (id: number) => {
    setIdParaDeletar(id);
    setModalAberto(true);
    
  };

  const fecharModal = (() => {
    setModalAberto(false);
    setSenha('');
    setIdParaDeletar(null);
  })

  const confirmDelet = async () => {
    if (senha === SENHA_CORRETA) {
      if(idParaDeletar !== null) {
        await deletarAgendamento(idParaDeletar);
        fecharModal();
        notifier.success("Senha correta agendamento apagado!")
      }
      }else {
        notifier.error("Senha Incorreta");
    }
  }


  useEffect(() => {
    getAgendamentos().then(dados => {
      setAgendamentos(dados);
      notifier.success("Agendamentos carregados com sucesso!")
      
    });
  }, []);

  const formatData = (dataBack: string | Date) => {
        if(!dataBack) {
          return "-"
        }
        const data = new Date(dataBack);
        return data.toLocaleString('pt-BR');
      };

  const agendamentosSala12 = agendamentos.filter(a=> a.sala === true);
  const agendamentosSala13 = agendamentos.filter(a=> a.sala === false);

  const deletarAgendamento = async (id: number) => {

    await deleteAgendamentos(id);

    setAgendamentos(prev => prev.filter(a=> a.id !== id));
  }
  return (
      <MainLayout>
          <div className='App'>
          <div className="container">
            <h2>Agendamentos sala 12º (Quantidade: {agendamentosSala12.length})</h2>
                  <table className='tabela'>
                    <thead>
                      <tr>
                        <th>Sala</th>
                        <th>Titulo</th>
                        <th>Responsável</th>
                        <th>Observação</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {agendamentosSala12.map(a => (
                        <tr key={a.id}>
                        <td>{a.sala ? "Sala 12" : "Sala 13"}</td>
                        <td>{a.titulo}</td>
                        <td>{a.responsavel}</td>
                        <td>{a.observacao}</td>
                        <td>{formatData(a.inicio)}</td>
                        <td>{formatData(a.fim)}</td>
                        <td><button className="btn-fechar" onClick={() => abrirConfirm(a.id)}>X</button></td>
                        </tr>
                      ))}
                      </tbody> 
                          
                  </table>
                <div className='container-2'>
                  <h2>Agendamentos sala 13º (Quantidade: {agendamentosSala13.length})</h2>
                  <table className='tabela'>
                    <thead>
                      <tr>
                        <th>Sala</th>
                        <th>Titulo</th>
                        <th>Responsável</th>
                        <th>Observação</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th></th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {agendamentosSala13.map(a => (
                        <tr key={a.id}>
                        <td>{a.sala ? "Sala 12" : "Sala 13"}</td>
                        <td>{a.titulo}</td>
                        <td>{a.responsavel}</td>
                        <td>{a.observacao}</td>
                        <td>{formatData(a.inicio)}</td>
                        <td>{formatData(a.fim)}</td>
                        <td><button className="btn-fechar" onClick={() => abrirConfirm(a.id)}>X</button></td>
                        </tr>
                      ))}
                      </tbody>    
                  </table>
                </div>
            </div>
                      {modalAberto && (
                <div className='teste'>
                  <div className='modal-overlay'>
                    <h3>Confirmar Exclusão</h3>
                    <div className="dados">
                    <input

                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder='Digite a senha para excluir'
                    />
                    </div>
                    <div className='modal-botoes'>
                      <button onClick={confirmDelet} className='btn-confirmar'>Confirmar</button>
                      <button onClick={fecharModal} className='btn-cancel'>Cancelar</button>
                    </div>
                  </div>
                </div> 
                )}
  
      </div>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme="colored"
      />
    </MainLayout>
    
  )
    
    
}

  
export default App
