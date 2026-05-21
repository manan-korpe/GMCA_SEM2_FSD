import { useState } from "react"

function App(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function save(){
        localStorage.setItem("name",name);
        localStorage.setItem("password",password);
        alert("Data Saved Successfuly");
        setName("");
        setPassword("");
    }

    function get(){
        setName(localStorage.getItem("name"));
        setPassword(localStorage.getItem("password"));
    }

    function clear(){
        localStorage.clear();
        alert("Data cleared Successfuly");
        setName("");
        setPassword("");
    }
    return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="button" onClick={save}>Login</button>
            <button type="button" onClick={get}>Get</button>
            <button type="button" onClick={clear}>clear</button>
        </form>
    </div>
    )
}

export default App;