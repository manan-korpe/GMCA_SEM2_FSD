function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#222",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>MyApp</h1>

      <nav>
        <a style={linkStyle} href="#">Home</a>
        <a style={linkStyle} href="#">About</a>
        <a style={linkStyle} href="#">Contact</a>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "15px",
};

export default Header;