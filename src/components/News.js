import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) =>{

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
  const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsData = await data.json();
    props.setProgress(70);
    setArticles(parsData.articles);
    setTotalResults(parsData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() =>{
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
      updateNews(); 
      // eslint-disable-next-line
  }, [])
    
  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsData = await data.json();
    setArticles(articles.concat(parsData.articles))
    setTotalResults(parsData.totalResults)
  };

    return (
      <>
        <h1 className='my-3 text-center' style={{margin: "90px 0 35px"}}>NewsMonkey - Top {props.category} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className='container my-3'>
        <div className="row" key="1">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.key}>
          <NewsItem title={element.title ? element.title: ""} desc={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
      </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }

 News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News