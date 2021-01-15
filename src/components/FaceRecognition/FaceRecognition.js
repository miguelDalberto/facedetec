import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageSource, box }) =>{
    if(!imageSource)return '';
    if(!imageSource.includes('http://') && !imageSource.includes('https://'))return <h2>not valid URL 😥</h2>;

    const boxes = box.map((element, i) =>{
        return(
            <div
                className='bounding-box'
                style={{ top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol }}
                key={i}
            >
            </div>
        )
    })
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' className='' alt='' src={imageSource} width='500px' height='auto' />
                {boxes}
            </div>
        </div>
    );
}


export default FaceRecognition;