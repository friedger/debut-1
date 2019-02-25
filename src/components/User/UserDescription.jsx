import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Heading,
} from 'react-bulma-components'
import UserIntroDisplay from 'components/User/IntroDisplay'
import UserIntroForm from 'components/User/UserIntroForm'
import { List } from 'react-content-loader'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import { Icon } from 'components/icon'
import './UserDescription.scss'

class UserDescription extends Component {
  static propTypes = {
    adminMode: PropTypes.bool.isRequired,
    displayView: PropTypes.bool.isRequired,
    fileExists: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    sessionUser: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    username: PropTypes.string
  }

  state = {
    isPopoverOpen: false,
  }

  render() {
    const {
      adminMode,
      displayView,
      fileExists,
      loading,
      sessionUser,
      userInfo,
      username,
    } = this.props

    if (!adminMode) {
      return (
        <div className="user-description">
          <div className="user-description__about-myself">
            <Heading className="mr-one" size={4}>About Myself</Heading>
              <Popover
                  isOpen={this.state.isPopoverOpen}
                  position="right"
                  padding={30}
                  onClickOutside={() => this.setState({ isPopoverOpen: false })}
                  content={({ position, targetRect, popoverRect }) => (
                      <ArrowContainer
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={'#383A3F'}
                        arrowSize={10}
                      >
                          <div
                              style={{
                                backgroundColor: '#383A3F',
                                padding: '20px',
                                color: 'white',
                                width: '300px',
                              }}
                              onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}
                          >
                            <p className="small">
                              Write a small bio about yourself.  Let everyone know who you are!
                            </p>
                          </div>
                      </ArrowContainer>
                  )}
              >
                <Icon
                  className="debut-icon debut-icon--pointer"
                  icon="IconQuestionCircle"
                  onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}
                  size={16}
                />
              </Popover>
          </div>
          {
            loading ? <List /> :
            <UserIntroDisplay
              adminMode={adminMode}
              description={userInfo.description}
              />
          }
        </div>
      )
    }

    return (
      <div className="user-description__info-details">
        <div className="user-description__about-myself">
          <Heading className="mr-one" size={4}>About Myself</Heading>
            <Popover
                isOpen={this.state.isPopoverOpen}
                position="right"
                padding={30}
                onClickOutside={() => this.setState({ isPopoverOpen: false })}
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer
                      position={position}
                      targetRect={targetRect}
                      popoverRect={popoverRect}
                      arrowColor={'#383A3F'}
                      arrowSize={10}
                    >
                        <div
                            style={{
                              backgroundColor: '#383A3F',
                              padding: '20px',
                              color: 'white',
                              width: '300px',
                            }}
                            onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}
                        >
                          <p className="small">
                            Write a small bio about yourself.  Let everyone know who you are!
                          </p>
                        </div>
                    </ArrowContainer>
                )}
            >
              <Icon
                className="debut-icon debut-icon--pointer"
                icon="IconQuestionCircle"
                onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}
                size={16}
              />
            </Popover>
        </div>
        <div className="user-description__button-actions mb-one">
          {
            fileExists ?
            <Button
              onClick={this.props.onCreateEdit}
              color="primary"
              className="mr-half"
              disabled={!displayView}
            >
              Edit
            </Button> :
            <Button
              onClick={this.props.onCreateEdit}
              color="primary"
              className="mr-half"
              disabled={!displayView}
            >
              Create
            </Button>
          }
        </div>
        {
          displayView ? <UserIntroDisplay description={userInfo.description} /> :
          <UserIntroForm
            description={userInfo.description}
            fileExists={fileExists}
            onCancel={this.props.onCancel}
            onSubmit={this.props.onSubmit}
            identityAddress={sessionUser.userData.identityAddress}
            userSession={sessionUser.userSession}
            username={username}
          />
        }
      </div>
    )
  }
}

UserDescription.defaultProps = {
  username: ''
}

export default UserDescription
