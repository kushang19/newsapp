import React from 'react'

const NewsItem = (props) => {
    let {title, desc, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute badge rounded-pill bg-danger" style={{right: '-10px', top:'-10px'}}>{source}</span>
            <img src={!imageUrl? 'https://cdn.ndtv.com/common/images/ogndtv.png' : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className='card-text'><small className='text-muted'>By {!author? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem