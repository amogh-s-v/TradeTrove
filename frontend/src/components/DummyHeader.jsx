import React from "react";

export default function DummyHeader() {
    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img style={s} className="imgLogo" src='http://localhost:9002/getIMG' />
                </a>
            </div>
        </header>
    )
}