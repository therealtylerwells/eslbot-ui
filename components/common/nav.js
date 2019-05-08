import React from 'react'
import Link from 'next/link'

const rightLinks = [
  {
    value: '/help',
    label: 'help'
  },
  {
    value: '/post',
    label: 'post job'
  },
  {
    value: '/',
    label: 'forums'
  },
  {
    value: '/reset-password',
    label: 'reset password'
  },
  {
    value: '/register',
    label: 'register'
  },
  {
    value: '/account',
    label: 'account'
  },
  {
    value: '/login',
    label: 'login'
  }

]

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>eslbot</a>
        </Link>
      </li>
      <ul>
        {rightLinks.map((link, index) => {
          return <li key={index}><Link href={link.value}><a>{link.label}</a></Link></li>
        })}
    </ul>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: Lato;
        width: 90%;
        margin: 0 auto;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
