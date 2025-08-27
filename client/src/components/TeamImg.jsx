import React, { useState } from 'react';

function TeamImg({ name, src, post, year, insta, linkedin }) {
    const img = `../../public/${year}/${src}.jpg`;
    const [blur, setBlur] = useState(0);

    return (
        <div>
            <div className="relative rounded-lg cursor-pointer overflow-hidden transition duration-300 transform shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                <img
                    className={`object-cover object-center w-full ${blur ? 'blur-sm' : ''}`}
                    src={img}
                    alt={name}
                />
                <div
                    onMouseEnter={() => setBlur(1)}
                    onMouseLeave={() => setBlur(0)}
                    className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100"
                >
                    <p className="mb-1 text-lg font-bold text-gray-100">{name}</p>
                    <p className="mb-4 text-xs text-gray-100">{post}</p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                        {insta && (
                            <a
                                href={insta}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-colors duration-300 hover:text-pink-400"
                            >
                                {/* Instagram Icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1.1.6 1.6 1.1.5.5.9 1 .9 1.6.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-1 .9-1.6 1.1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1.1-.6-1.6-1.1-.5-.5-.9-1-.9-1.6-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5 1-.9 1.6-1.1.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.6.2 4.6.4 3.7.7 2.7 1 1.8 1.5 1 2.3.2 3.1-.3 4-.6 5c-.3.9-.5 1.9-.6 3.3C-.1 9.3 0 9.7 0 12s0 2.7.1 3.9c.1 1.4.3 2.4.6 3.3.3 1 .8 1.9 1.6 2.7.8.8 1.7 1.3 2.7 1.6.9.3 1.9.5 3.3.6 1.2.1 1.6.1 3.9.1s2.7 0 3.9-.1c1.4-.1 2.4-.3 3.3-.6 1-.3 1.9-.8 2.7-1.6.8-.8 1.3-1.7 1.6-2.7.3-.9.5-1.9.6-3.3.1-1.2.1-1.6.1-3.9s0-2.7-.1-3.9c-.1-1.4-.3-2.4-.6-3.3-.3-1-.8-1.9-1.6-2.7-.8-.8-1.7-1.3-2.7-1.6-.9-.3-1.9-.5-3.3-.6C15.7 0 15.3 0 12 0z" />
                                    <circle cx="12" cy="12" r="3.2" />
                                    <circle cx="18.4" cy="5.6" r="1.44" />
                                </svg>
                            </a>
                        )}
                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-colors duration-300 hover:text-blue-400"
                            >
                                {/* LinkedIn Icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.77 0 5-2.24 5-5v-14c0-2.76-2.23-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.96 0-1.72-.78-1.72-1.72s.77-1.72 1.72-1.72c.95 0 1.72.78 1.72 1.72 0 .95-.77 1.72-1.72 1.72zm13.5 10.28h-3v-4.5c0-1.07-.02-2.44-1.48-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z"/>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

TeamImg.defaultProps = {
    post: "",
    insta: "",
    linkedin: ""
};

export default TeamImg;
