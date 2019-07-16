import React from 'react';

const FaceRecognition=({imageUrl})=>{
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
        
            </div>
        </div>
    )}

}


export default FaceRecognition; 