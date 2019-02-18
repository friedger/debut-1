import React, { Component } from 'react'
import _ from 'lodash'
import { UserContext } from 'components/User/UserProvider'
import './IconList.scss'

class IconList extends Component {
  addDefaultSrc = (evt) => {
    evt.target.src = 'https://i.imgur.com/w1ur3Lq.jpg'
  }

  render() {
    const { apps } = this.props
    const { defaultImgUrl } = this.context.state

    return (
      <ul className="icon-list">
        {
          _.map(apps, (app, index) => {
            return (
              <li className="icon-list__single" key={`${app.url}-${index}`}>
                <a href={app.url} target="_blank" rel='noreferrer noopener'>
                  <img onError={this.addDefaultSrc} src={_.get(app, 'icons[0].src', defaultImgUrl)} alt="dapp" height="42" width="42" />
                </a>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
IconList.contextType = UserContext
export default IconList
