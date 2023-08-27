import React from 'react';
import './Error.scss'
import { ErrorLottie } from '../../../Data';

const ErrorPage = () => {
    return (
        <div className="container" id="error404">
            <div className="error">
                <ErrorLottie />
            </div>
        </div>
    );
};

export default ErrorPage;
