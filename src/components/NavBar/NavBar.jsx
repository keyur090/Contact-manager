const NavBar = () => {
  const handleClick = () => {
    window.location.reload();
    window.location.replace("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container">
        <div onClick={handleClick} className="navbar-brand cursor-pointer">
          <i className="fa fa-mobile text-warning"></i> Contact{" "}
          <span className="text-warning">Manager</span>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          style={{
            fontWeight: "normal",
            padding: "3px 7px 3px 7px",
            border: "1px solid",
            fontFamily: "monospace",
          }}
        >
          Logout<i className="fa-solid fa-right-from-bracket ml-2 "></i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
