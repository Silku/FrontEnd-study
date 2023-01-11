import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons';
import ImageZoom from './ImageZoom'

// 폴더 import해도 자동으로 index 파일로 불러옴, 경로에 따로 index쓸필요없음


const PostImages = ({images}) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);


    const onZoom = useCallback(()=>{
        setShowImagesZoom(true);
    },[])

    const onClose = useCallback(()=>{
        setShowImagesZoom(false);
    },[])

    if(images.length === 1){
        <>
            <img 
                role="presentation"
                src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>
            {showImagesZoom && <ImageZoom images={images} onClose={onClose}/>}
        </>
    }
    if(images.length === 2){
        return(
            <>
                <div style={{display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                    <img 
                    role="presentation"
                    style={{width:'50%',height:'100%', objectFit:'cover'}}
                    src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>
                    <img 
                    role="presentation"
                    style={{width:'50%', height:'100%', objectFit:'cover'}}
                    src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom}/>
                </div>
                {showImagesZoom && <ImageZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    return (
        <>
            <div style={{display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                <img 
                    style={{width:'50%'}}
                    role="presentation"
                    src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom}/>
                <div 
                    role="presentation"
                    style={{width:'50%'}}
                    onClick={onZoom}
                >
                    <PlusOutlined/>
                    <br/>
                    {images.length-1}개의 사진 더보기 

                </div> 
            </div>
            {showImagesZoom && <ImageZoom images={images} onClose={onClose}/>}
        </>
    )
}

PostImages.propTypes ={
    images : propTypes.arrayOf(propTypes.object)
}

export default PostImages