import React from 'react'
import styled from 'styled-components'

import { calculatePoint } from '../logic/point'
import { StoreConsumer } from '../store'
import Avatar from './Avatar'
import AchievementListItem from './AchievementListItem'

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
`

const Point = styled.div`
  text-align: center;
  color: #00d8ff;
`

const Name = styled.div`
  font-size: 20px;
`

const AchievementContainer = styled.div`
  & > div:not(:last-child) {
    border-bottom: 2px dashed #6a6a6a;
  }
`

export const Tags = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

export const Tag = styled.div`
  padding: 4px 12px;
  background-color: #00d8ff;
  margin: 0 5px 5px;
  border-radius: 0.2rem;
  font-size: 80%;
`

function Dashboard(props) {
  const avatarSize = 120

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
            <Container>
              <Avatar
                className="mt-4"
                url={authUser.photoURL}
                size={avatarSize}
              />
              <Name className="py-3">{authUser.displayName}</Name>
              <Tags>
                {['react', 'react-redux', 'recompose'].map(
                  (interest, index) => <Tag>{interest}</Tag>
                )}
              </Tags>
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
            </Container>
          </div>
        )
      }}
    </StoreConsumer>
  )
}

export default Dashboard
