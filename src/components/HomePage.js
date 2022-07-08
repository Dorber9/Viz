import React from 'react'
import { Container, Card } from "react-bootstrap";
import "../App.css";


const cardShadow={boxShadow:"inset rgb(0 0 0) -2px -1px 14px 2px" , background:"#ffee9db3"};

const HomePage = () => {
  return (
      <>
      <div className="pshDwn">
     <blockquote className="quote-box">
          <p className="quotation-mark">“</p>
          <p className="quote-text">
            That's how people that don't understand football analyse football.
          </p>

          <div className="blog-post-actions">
            <p className="blog-post-bottom">- Jose Mourinho -</p>
          </div>
        </blockquote>
             <div className="pot">
        <img style={{opacity:"0.7"}} src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg" width="50px" height="50px"/>
        </div>  
        </div>
       
       
    </>
  )
}

export default HomePage