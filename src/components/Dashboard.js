import React from 'react'
import styled from 'styled-components'

import { calculatePoint } from '../logic/point'
import { StoreConsumer } from '../store'
import { Avatar } from './Avatar'
import AchievementListItem from './AchievementListItem'

const DisplayName = styled.h5``

const Point = styled.div`
  text-align: center;
  color: #00d8ff;
`

const AchievementContainer = styled.div`
  & > div:not(:last-child) {
    border-bottom: 2px dashed #6a6a6a;
  }
`

function Dashboard(props) {
  const avatarHeight = 120

  return (
    <StoreConsumer>
      {({ authUser, friends, achievements }) => {
        const totalFriends = achievements.filter(a => a.type === 'networking')
          .length
        const totalCollectedBounties = achievements.filter(
          a => a.type === 'bounty'
        ).length

        return (
          <div className="container">
            <div className="col-md-4 offset-md-4">
              <Avatar
                className="mt-4"
                src={`${authUser.photoURL}?height=${avatarHeight}`}
                height={avatarHeight}
              />
              <DisplayName className="py-4">{authUser.displayName}</DisplayName>

              <Point className="pb-4">
                <h3>
                  <i className="fas fa-star" /> {calculatePoint(achievements)}
                </h3>
                <span>Points</span>
              </Point>

              <AchievementContainer>
                <AchievementListItem
                  badgeClass="fas fa-handshake"
                  badgeTitle="Total Friends"
                  badgeCount={totalFriends}
                />
                <AchievementListItem
                  badgeClass="fas fa-money-check-alt"
                  badgeTitle="Bounty Collected"
                  badgeCount={totalCollectedBounties}
                />
              </AchievementContainer>
            </div>
          </div>
        )
      }}
    </StoreConsumer>
  )
}

export default Dashboard
