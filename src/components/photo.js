import React from 'react';

export default ({ farm, server, id, secret, title, getExif, exif }) => {
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`;

    return (
        <div className="imgContainer">
            <img
                onClick={() => getExif(id, secret)}
                src={url}
                alt={title}
                className="img"
            />
            {exif ? <div className="exif">{exif.camera}</div> : null}
        </div>
    );
};
