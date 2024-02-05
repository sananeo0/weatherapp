import React from 'react'
import { useState } from 'react';
import "./search.scss"
import { Search2Icon} from '@chakra-ui/icons'

export default function Search({ onSearchChange} ) {
  const [searchWord,setSearchWord]=useState("")

  const handleInputChange = (e) => {
    const word = e.target.value;
    setSearchWord(word.trim());
  };
  
  const handleSearchClick = () => {
    if (searchWord == "") return;
    onSearchChange(searchWord);
    setSearchWord("") 
  };
  
  return (
      <div className='search'>
        <input type="text" placeholder='Enter city name!' onChange={handleInputChange} value={searchWord}/>
        <button className='search-button' onClick={handleSearchClick }><Search2Icon fontSize={18}/></button>
    </div>
  )
}
