import { useState, useEffect } from "react"

function App(){
    const [time, setTime] = useState(new Date());

    useEffect(()=>{
        const timeRef = setInterval(()=>{
            setTime(new Date())
        },1000);

        return ()=>{
            clearInterval(timeRef);
        }
    },[]);

    return <h1>{time.toLocaleString()}</h1>
}

export default App;