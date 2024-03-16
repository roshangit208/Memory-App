import './Form.css';
import { useState, useRef } from 'react';
import axios from "axios";

const Form = () => {
    const title = useRef();
    const desc = useRef();
    const [file, setfile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newMemory = {
            title: title.current.value,
            desc: desc.current.value
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newMemory.img = fileName;
            console.log(newMemory);
            try {
                await axios.post("/upload", data);
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/", newMemory);
            //  window.location.reload();
            const form = document.querySelector("#memory-form");
            form.reset();

        }
        catch (err) {
            console.log(err);

        }

    };
    return (
        <>
            <div className=" shadow-lg p-2 bg-white rounded-2">
                <form id='memory-form' onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="title" className='form-label' >Title</label>
                        <input type="text" name='title' className='form-control' ref={title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className='form-label' >Description</label>
                        <input type="text" name='desc' className='form-control' ref={desc} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className='form-label'>Featured Image</label>
                        <input type="file" name="img" id="" className='form-control' onChange={(e) => setfile(e.target.files[0])} />
                    </div>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                </form>
            </div>

        </>
    );
}

export default Form;
