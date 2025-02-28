import React from 'react'
import "../../styles/home.css"
import { Container, Row, Col } from 'reactstrap'
import heroImg from "../../assets/images/hero-img01.jpg"
import heroImg02 from '../../assets/images/hero-img02.jpg'
import heroVideo from '../../assets/images/hero-video.mp4'
import experienceImg from '../../assets/images/experience.png'
import ServiceList from '../../services/ServiceList'
import FeaturedTourList from '../Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery'
import Testimonials from '../Testimonial/Testimonials'
import Newsletter from '../../shared/Newsletter'



const Home = () => {
  return <>
    {/*==================hero section start====================*/}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
              <h1>Travelling opens  the doors to creating <span style={{ color: "orange" }}>memories</span> </h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Omnis consequatur dolore nam modi labore facere id ut
                veniam itaque quasir sunt unde? Mollitia id soluta animi
                repudiandae omnis quibusdam illo blanditiis possimus ex
                sint cupiditate corrupti labore non, qui est porro excepturi
                quasi labor.</p>
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box'>
              <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box mt-4'>
              <video src={heroVideo} alt="" controls />
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box mt-5'>
              <img src={heroImg02} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*==================hero section start=================*/}
    <section className='pt-5'>
      <Container>
        <Row>
          <Col lg="3">
            <h5 style={{color:"red"}} >
              What we Serve
            </h5>
            <h2 className="services__title">
              We offer Best Services
            </h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>

    {/*==================featured tour section start======================*/}
    <section className='pt-5'>
      <Container>
        <Row>
          <Col lg='22' className='mb-5'>
            <h5 className='Experience'>
              Explore
            </h5>
            <h2 className="featured__tour-title">
              Our Featured Tours.
            </h2>
          </Col>
          <FeaturedTourList />
        </Row>

      </Container>
    </section>

    {/*==================featured tour section end======================*/}
    {/*==================experience section start=========================*/}

    <section className='pt-5'>  
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
              <h5 className='Experience' >
                Experience
              </h5>
              <h2>
                With our all experience <br /> we will serve you.
              </h2>
              <p>
                Traveling , it leaves you speechless, then turns you into a storyteller.
                <br />
                We travel, some of us forever, to seek other states, other lives, other souls.
              </p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successful Trips!</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular Clients</h6>
              </div>
              <div className="counter__box">
                <span>10</span>
                <h6>Years of Experience!</h6>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*==================experience section end=========================*/}
    {/*==================gallery section start==========================*/}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h5 style={{color: "orange"}}>
              Gallery
            </h5>
            <h2 className="gallery__title">
              Visit our customers Tour Gallery!
            </h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery ku />
          </Col>
        </Row>
      </Container>
    </section>
    {/*==================gallery section end============================*/}
    {/*==================testimonial section start============================*/}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h5 className="services__subtitle">
                Clients Lover
            </h5>
            <h2 className="testimonial__title">What our clients say about us</h2>
          </Col>
          <Col lg='12'>
            <Testimonials />
          </Col>
        </Row>
      </Container>
    </section>
    {/*==================testimonial section end============================*/}
    <Newsletter />



  </>
}

export default Home
