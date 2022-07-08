import React from 'react'
import { Container, Card } from "react-bootstrap";

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
        </div>
    </>
  )
}

export default HomePage