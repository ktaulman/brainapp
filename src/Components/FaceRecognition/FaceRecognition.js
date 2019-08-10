import React from 'react';
import "./FaceRecognition.css"

const FaceRecognition=({imageUrl,box})=>{
    if(!imageUrl){
        return(
        <div 
        className="center f3 ma5 hover-light-purple b">Please Copy Paste Link Above</div>)
    }else{     
    return(
        <div 
        className=
            'center'
            >
            <div 
            className='absolute mt2 bw3 b--solid b--green'>
            <img 
                className='image'
                id='inputImage'
                src={imageUrl}
                alt="han solo"
            />
            <div 
            className="bounding-box"
            style={{
                    left:box.leftCol,
                    top:box.topRow,right:box.rightCol,bottom:box.bottomRow
                }}
            >  
            </div>   

            </div>
        </div>
    )}

}


export default FaceRecognition; 