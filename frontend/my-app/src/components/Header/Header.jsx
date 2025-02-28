import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './header.css'
import { AuthContext } from '../../context/AuthContext'

const nav_links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
]


const Header = () => {


  const headerRef = useRef(null)
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)
  const userFromStore = JSON.parse(localStorage.getItem('user'))?.username
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate("/")
  }


  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }


  useEffect(() => {
    stickyHeaderFunc()
    return window.removeEventListener('scroll', stickyHeaderFunc)
  })

  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav_wrapper d-flex '>
          {/*=============logo===========*/}
          <div className='logo'>
            <img src={logo} alt="" />
          </div>
          {/*=============logo end========== */}
          {/*=============menu start===========*/}
          <div className='navigation'>
            <ul className='menuder align-items-left gap-2  custom-menu ' style={{marginRight:"15px"}}>
              {
                nav_links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>
                      {item.display}</NavLink>
                  </li>
                ))}
            </ul>

            {/*=============menu end============= */}
            <div className='nav_right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>

                {userFromStore ? (
                  <>
                    <h5 className='mb-0'>{user.username}</h5>
                    <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <button className='btn secondary__btn'>
                      <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link>
                    </button>
                    <button className='btn primary__btn'>
                      <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link>
                    </button>
                  </>
                )}

              </div>
              <span className='mobile__menu'>
                <i className="ri-menu-line"> </i>
              </span>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  </header>
}

export default Header
