import './Sidebar.css'
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean,
    onClose: () => void;
}

export const Sidebar = ({isOpen, onClose}: SidebarProps) => {
    const navigate = useNavigate();

    function novoAgendamento () {
        navigate('/cadastro');
    }

    return (
        <>
        {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className='btn-fechar' onClick={onClose}>X</button>

            <nav className='sidebar-links'>
                <h3 className='menu'>Menu</h3>
                <ul>
                    <li><button className='btn-novo' onClick={novoAgendamento}> + Novo Agendamento</button></li>
                </ul>
            </nav>
        </aside>
        </>
    )
}