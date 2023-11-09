import React from 'react'
import { useGlobalContext } from './context';

const SearchForm = () => {
  const {setUserSearch}=useGlobalContext()
  const handleSubmit=(e)=>{
    e.preventDefault();
    // using just one name property getting the value
    
    const searchValue = e.target.elements.search.value;
    if(!searchValue) return ;
    setUserSearch(searchValue)
  }

  return (
    <section >
      <h1 className='title'>unsplash images</h1>
      <form className='search-form'
      onSubmit={handleSubmit}
      >
        <input
        type="text" 
        name='search'
        placeholder='cat'
        className='form-input search-input'
        />
        <button className='btn'>Submit</button>
      </form>    
    </section>
  )
}

export default SearchForm
