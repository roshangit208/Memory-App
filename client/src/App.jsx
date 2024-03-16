
import Form from './components/form/Form';
import Memory from './components/memory/Memory';
import { useState, useEffect } from 'react';
import axios from 'axios';





const App = () => {
  
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const fetchMemory = async () => {
            const result = await axios.get("/memory");
            setMemories(result.data);
        };
        fetchMemory();

    }, [memories]);
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <h3 style={{ textAlign: "center", color: "white", fontFamily: "cursive" }}>Memories saved, moments treasured</h3>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3 d-flex justify-content-center">
                        <div className="container">
                            <div className="row">
                                <Form />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 ">
                        <div className="container ">
                            <div className="row justify-content-around ">
                                {memories.map((m) =>
                                (
                                    <Memory key={m._id} memory={m} />
                                ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
