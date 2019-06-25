import React, { Component } from 'react'
import Link from 'next/link'
import { Dropdown } from 'semantic-ui-react'

const rightLinks = [
  {
    value: '/help',
    label: 'Help'
  },
  {
    value: 'https://forums.eslbot.com',
    label: 'Forums'
  },
  {
    value: '/post',
    label: 'Post Job'
  },
]

interface navProps {
  userId: string;
}

interface navState {

}

class Nav extends Component<navProps, navState> {
  state = {
    userId: null,
  }
  render() {
    return (
      <div>
      <nav>
        <ul>
          <li>
            <Link prefetch href="/">
              <a><strong>eslbot</strong></a>
            </Link>
          </li>
          <ul>
            {rightLinks.map((link, index) => {
              return <li key={index}><Link href={link.value}><a>{link.label}</a></Link></li>
            })}
            {this.props.userId ?
              <div>
                <li><Link href="/account"><a>Account</a></Link></li>
              </div>
              :
              <li><Link href="/login"><a>Login</a></Link></li>
            }
          </ul>
        </ul>
              {/* 
      // @ts-ignore */}
        <style jsx>{`
          :global(body) {
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
      </div>
    )
  }
}

export default Nav