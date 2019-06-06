import React, { Component } from 'react'
import Link from 'next/link'
import Fonts from '../../utils/fonts'

const rightLinks = [
  {
    value: '/help',
    label: 'help'
  },
  {
    value: 'https://forums.eslbot.com',
    label: 'forums'
  },
  {
    value: '/post',
    label: 'post job'
  },
]

interface navProps {
  userId: any;
}

interface navState {

}

class Nav extends Component<navProps, navState> {
  state = {
    userId: null,
  }
  componentDidMount() {
    Fonts()
  }
  render() {
    return (
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
            {this.props.userId ?
              <div>
                <li><Link href="/account"><a>account</a></Link></li>
              </div>
              :
              <li><Link href="/login"><a>login</a></Link></li>
            }
          </ul>
        </ul>
              {/* 
      // @ts-ignore */}
        <style jsx>{`
          :global(body) {
            margin: 0 auto;
            font-family: 'Karla';
          }
          nav {
            text-align: center;
          }
          ul {
            display: flex;
            justify-content: space-between;
            font-family: 'Poppins';
          }
          nav > ul {
            padding: 4px 0px;
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
  }
}

export default Nav
