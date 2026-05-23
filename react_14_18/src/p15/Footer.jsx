function Footer() {
  return (
    <footer
      style={{display: "flex",justifyContent: "center",alignItems: "center",padding: "10px 20px",background: "#222",color: "white",marginTop: "20px",
      }}
    >
      <p style={{ margin: 0, fontSize: "14px" }}>
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;