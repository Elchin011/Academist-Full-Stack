import React from 'react'
import HeroBannerSlider from '../components/HeroBannerSlider'
import BlueLight from '../components/BlueLight'
import OnlineShop from '../components/OnlineShop'
import Quality from '../components/Quality'
import Book from '../components/Book'
import Appointment from '../components/Appointment'
import Autumn from '../components/Autumn'
import Latest from '../components/Latest'
import Visit from '../components/Visit'
import CoursesList from '../components/Courses'


const HomeThemplate = () => {
  return (
    <div>
      <HeroBannerSlider/>
      <CoursesList/>
      <BlueLight/>
      <OnlineShop/>
      <Quality/>
      <Book/>
      <Appointment/>
      <Autumn/>
      <Latest/>
      <Visit/>
    </div>
  )
}

export default HomeThemplate
