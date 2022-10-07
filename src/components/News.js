import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 20,
    category : 'sports',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }

  constructor(){
    super();
    this.state = {
        articles : [],
        loading : false,
        page : 1,
    }
  }

  async updateNews(){
    console.log("dd",this.state.page)

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=336f865add8e48a5b7d843dda7f33809&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parcedData = await data.json();
    console.log(parcedData);

    this.setState({
        articles : parcedData.articles,
        totalResults : parcedData.totalResults,
        loading:false
    })
  }

  async componentDidMount(){
    this.updateNews();
  }

  handleNext = () => {
    console.log("next");
    this.setState({page : this.state.page + 1},()=>{
      this.updateNews();
    });
  }
  handlePrev = async () => {
    console.log("prev");
    this.setState({page : this.state.page - 1},()=>{
      this.updateNews();
    });
  }


  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        { this.state.loading && <Spinner/>}
        <div className="row my-4">
            {!this.state.loading && this.state.articles.map((element,index)=>{
                let {title, description, urlToImage, url} = element;
                return <div className="col-md-3" key={index}>
                    <NewsItem title={title?title.slice(0,55):""} description={description?description.slice(0,90):""} imageUrl={urlToImage} newsUrl={url} author={element.author} date={element.publishedAt} />
                </div>
            })}
        </div>
        <div className="container d-flex flex-row-reverse my-3">
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.handleNext}> Next &rarr; </button>
          <button disabled={this.state.page <= 1} className="btn btn-sm btn-dark" onClick={this.handlePrev}> &larr; Prev </button>
        </div>
      </div>
    )
  }
}

export default News