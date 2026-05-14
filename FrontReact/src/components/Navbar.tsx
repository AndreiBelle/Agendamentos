import './Navbar.css';


interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
 return (
    <nav className="navbar-container">
      <div className="navbar-logo">Sistema de Agendamentos</div>
      <div className='btn-div'>
        <button className="menu-button" onClick={onMenuClick}>
        ☰
      </button>
      </div>
    </nav>
  );
};