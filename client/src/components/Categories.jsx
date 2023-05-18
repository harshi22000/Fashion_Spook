import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import CategoryItem from './CategoryItem'


const Container= styled.div`
    display:flex;
    padding:20px;
    justify-content: space-between;
`
const Categories = () => {
  return (
    <Container>
        {categories.map(items => (
            <CategoryItem item={items} key={items.id}/>
        ))}
    </Container>
  )
}

export default Categories
