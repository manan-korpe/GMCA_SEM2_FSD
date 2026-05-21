import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dataFetch, setDatafetch] = useState([]);
  const [dataAxios, setDataaxios] = useState([]);
  const [dataAsync, setDataasync] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((res) => setDatafetch(res.todos))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((res) => setDataaxios(res.data.todos))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        setDataasync(res.data.todos);
      } catch (err) {
        console.log(err.message);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1>Data Fetching</h1>

      <div style={{ display: "flex", gap: "20px" }}>

        <table border="1">
          <thead>
            <tr>
              <th colSpan="4">Fetch</th>
            </tr>
            <tr>
              <th>id</th>
              <th>todo</th>
              <th>completed</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody>
            {dataFetch.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>{todo.completed ? "true" : "false"}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table border="1">
          <thead>
            <tr>
              <th colSpan="4">Axios</th>
            </tr>
            <tr>
              <th>id</th>
              <th>todo</th>
              <th>completed</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody>
            {dataAxios.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>{todo.completed ? "true" : "false"}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table border="1">
          <thead>
            <tr>
              <th colSpan="4">Async/Await</th>
            </tr>
            <tr>
              <th>id</th>
              <th>todo</th>
              <th>completed</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody>
            {dataAsync.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>{todo.completed ? "true" : "false"}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;