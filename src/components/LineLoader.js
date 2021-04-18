import './LineLoader.css';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'

const LineLoader = ({ isFetchingData }) => {
  const ref = useRef();
  
  useEffect(() => {
    let timeoutId = 0;

    if(ref.current && isFetchingData) {
      ref.current.style.display = 'block';
      ref.current.style.animationDuration = '20s';
    }
    
    if(ref.current && !isFetchingData) {
      ref.current.style.animationDuration = '1.2s';
      timeoutId = setTimeout(() => {
        ref.current.style.display = 'none';
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetchingData])

  return <div ref={ref} className="line-loader"></div>;
}

const mapStateToProps = state => ({ isFetchingData: state.isFetchingData });

export default connect(mapStateToProps)(LineLoader)
