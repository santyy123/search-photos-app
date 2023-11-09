import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useGlobalContext } from './context'

const url=`https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
  const {userSearch} = useGlobalContext();

  const response = useQuery({
    queryKey:['images',userSearch],
    // this above array must change for every component rerender to run the queryFn again
    queryFn:async ()=>{
      const response = await axios.get(`${url}&query=${userSearch}`)
      return response.data
    }
  });

  if(response.isLoading){
    return <section className='image-container'>
      <h4>Loading...</h4>
    </section>
  }

  if(response.isError){
    return <section className='image-container'>
      <h4>There was an error...</h4>
    </section>
  }


  const results = response.data.results
  if(results.length < 1){
    return <section className='image-container'>
      <h4>No results found...</h4>
    </section>
  } 

  console.log(response)
  return (
    <section className='image-container'>
      {
        results.map((item)=>{
          const url = item?.urls?.regular
          return <img src={url} key={item.id} alt={
          item.alt_description}
          className='img'/>
        })
      }
    </section>
  )
}

export default Gallery
