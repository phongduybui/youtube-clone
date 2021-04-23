/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    if(isFetching) {
      console.log('fetch')
      callback();
    }
  }, [isFetching])

  const handleScroll = _.debounce(() => {
    if(window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight || isFetching) {
      return;
    }
    console.log('cuoi trang')
    setFetching(true);
  }, 100);

  return [isFetching, setFetching];
}

export default useInfiniteScroll;
