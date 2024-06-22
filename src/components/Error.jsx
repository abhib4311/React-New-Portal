import React from 'react';
import { useSelector } from 'react-redux';

const ErrorPage = () => {
    const error = useSelector((state) => state.news.error);
    return (

        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-2">
            <div className="max-w-md text-center">
                <div className="text-4xl font-extrabold text-gray-600">

                    <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="Lost image" />{"Look like you're lost"}

                </div>   <p className="text-2xl font-semibold md:text-3xl">

                </p>
                <p className="mt-4 mb-8 text-gray-600">
                    {error}{" The requested page is not available!"}
                </p>

            </div>
        </div>
    );
};

export default ErrorPage;

