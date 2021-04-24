import './SearchBar.css';
import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { 
  fetchVideosAndChannelsByTerm, 
  setIsFetchingData, 
  updateSearchTerm,
} from '../actions';
import useWindowDimensions from '../hooks/useWindowDimensions';
import HeaderButton from './HeaderButton';
import Modal from './Modal';
import { connect } from 'react-redux';
import history from '../history';


const SearchBar = ({ 
  isMobile, 
  setMobile, 
  fetchVideosAndChannelsByTerm, 
  setIsFetchingData,
  updateSearchTerm,
  searchTerm
}) => {

  const { width } = useWindowDimensions();
  const refSearch = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if(refSearch.current && refSearch.current.contains(e.target)) {
        return;
      }
      setMobile(false);
    }
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const renderBackButton = () => {
  //   if(isMobile && width < 739) {
  //     return 
  //   }
  // }

  const searchBarMobile = isMobile && width < 739 ? 'search-bar--mobile' : '';

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setMobile(false);
    updateSearchTerm(data.search);
    setIsFetchingData(true);
    fetchVideosAndChannelsByTerm('', data.search)
    history.push('/search-results');
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={refSearch}
      className={`search-bar ${searchBarMobile}`}
    >
      {isMobile && width < 739 ? (

        <>
          <Modal />
          <div className="search-bar__back-btn" onClick={() => setMobile(false)}>
            <MdArrowBack />
          </div>
        </>
      ) : null}
      <input
        {...register("search")}
        defaultValue={searchTerm}
        className="search-bar__input"
        placeholder="Tìm kiếm"
      />
      <HeaderButton
        className="btn--search"
        dataTitle="Tìm kiếm"
        Icon={AiOutlineSearch}
      />
    </form>
  );
}

const mapStateToProps = state => ({ searchTerm: state.searchResults.searchTerm });

const mapDispatchToProps = {
  setIsFetchingData,
  fetchVideosAndChannelsByTerm,
  updateSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
