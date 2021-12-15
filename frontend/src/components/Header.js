import headerLogo from "../images/header-logo.svg";

function Header({ button, children}) {
  return (
    <header className="header">
      <div className="header__main">
      <img src={headerLogo} alt="Around the US text" className="header__logo" />
      {button}
      </div>
      {children}
    </header>
  );
}

export default Header;
