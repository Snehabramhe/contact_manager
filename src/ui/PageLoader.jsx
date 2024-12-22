import React from 'react';
import reactImage from "../assets/react.svg";

const PageLoader = () => {
    return (
        <div className="flex flex-row justify-center items-center min-h-screen">
            <img src={reactImage} alt="" width={100} height={100} className="animate-spin"/>
        </div>
    )
};
export default PageLoader;


