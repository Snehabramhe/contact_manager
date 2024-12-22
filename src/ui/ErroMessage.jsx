import React from 'react';
import reactImage from "../assets/react.svg";

const ErrorMessage = ({message}) => {
    return (
        <div className="flex flex-row justify-center items-center">
           <h3 className="text-xl text-red-500">{message}</h3>
        </div>
    )
};
export default ErrorMessage;


