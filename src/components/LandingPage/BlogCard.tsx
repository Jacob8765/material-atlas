import React from 'react';

const BlogCard = ({label, backgroundImage}) => {
    return (
        <div className='m-4'>
            <div
                className='relative'
                style={{
                    height: '375px',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
            </div>
            
            {/* Background block for label */}
            <div className="bg-opacity-80 py-1 px-3 rounded flex items-center justify-center" 
                 style={{ backgroundColor: 'rgb(120,123,117)', height: '85px' }}>
                <h1 className="text-emerald-300 font-normal text-2xl text-center">{label}</h1>
            </div>
        </div>
    )
}

export default BlogCard;
