import React from 'react';

const Wave = ({ fill, className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={fill} fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,128C672,107,768,85,864,106.7C960,128,1056,192,1152,181.3C1248,171,1344,85,1392,42.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    )
}

export default Wave
