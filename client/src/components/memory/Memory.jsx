import "./Memory.css"
import { useRef } from "react";
import axios from "axios";
const Memory = ({memory}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const id = useRef();
    const submitdltHandler = async (e)=>
    {
        e.preventDefault();
       try{

           const deleteMemory = 
           {
            id : id.current.value
           }
             await axios.post("/delete",deleteMemory);
       }
       catch(err)
       {
         console.log(err);
       }

    }
    return (
        <>
            <div className="card col-md-4 mb-3" style={{ width: "18rem"}}>
                <img src={PF+memory.img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{memory.title}</h5>
                    <p className="card-text">{memory.desc}</p>  
                    <form onSubmit={submitdltHandler} >
                      <input type="hidden" value={memory._id} ref={id} />
                      <button type="submit" className="btn btn-primary btn-sm" >delete</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Memory;
