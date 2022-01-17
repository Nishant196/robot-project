import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App(){
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState('');

    const getData = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const searchData = (text) => {
        let matches = []
        if(text.length > 0){
            text = text.replace(/\\/g, "");
            matches = data.filter(data=>{
                const regex = new RegExp(`${text}`, "gi");
                return data.name.match(regex)
            })
            setResult(matches);
        } else {
            setResult('');
        }
        setSearch(text);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="tv-maze">
            <div className="container">
                <div className="contentBox">
                    <div className="row">
                        <div className="col-xs-12 col-md-12 text-center">
                            <h1 className="heading">Robot Project</h1>
                            <input type="text" placeholder="Search Robots" value={search} onChange={e => searchData(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {result
                    ?<>
                    {result? result.map((result, i) => (
                        <div key={i} className="col-xs-12 col-md-3">
                            <div className="movie-box">
                                <img src={'https://robohash.org/' + result.id} alt="Show"/>
                                <h4>{result.name}</h4>
                                <p>{result.email}</p>
                            </div>
                        </div>
                    )):null}
                    </>
                    :<>
                    {data? data.map((data, i) => (
                        <div key={i} className="col-xs-12 col-md-3">
                            <div className="movie-box">
                                <img src={'https://robohash.org/' + data.id} alt="Show"/>
                                <h4>{data.name}</h4>
                                <p>{data.email}</p>
                            </div>
                        </div>
                    )):null}
                    </>
                    }
                </div>
            </div>
        </div>
    )
}
export default App;