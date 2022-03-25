import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from "./CoinTable";

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/coins?limit=100", {
                headers: {
                    "x-access-token":
                        "coinranking132642fd459b9ffc3e1d04c99e9d371124702ec316200dab",
                },
            })
            .then((res) => {
                setData(res.data.data.coins);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return "Loading...";
    }
    return (
        <div id="app">
            <CoinTable data={data} />
        </div>
    );
}

export default App;
