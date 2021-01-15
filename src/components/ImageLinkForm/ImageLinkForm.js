import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) =>{
    return (
        <div>
            <p className='f3'>
                {"This tool will detect the faces in your pictures! Give it a try."}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                    <button className='w-30 grow f4 ph3 pv2 dib white bg-gray br3' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;