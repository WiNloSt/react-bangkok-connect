import React from 'react'
import styled from 'styled-components'
import { Input } from 'react-powerplug'
import { calculatePoint } from '../logic/point'
import { StoreConsumer } from '../store'
import Avatar from './Avatar'
import AchievementListItem from './AchievementListItem'
import { setUser } from '../data'

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
  align-items: center;
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

const AddTag = styled(Tag)`
  background-color: #007bff;
  cursor: pointer;
`

class Dashboard extends React.Component {
  state = {
    addTag: false,
    tag: ''
  }

  render() {
    const avatarSize = 120

    return (
      <StoreConsumer>
        {({ authUser, friends, achievements, user }) => {
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
                  {user.tags &&
                    user.tags.map((interest, index) => (
                      <Tag key={index}>{interest}</Tag>
                    ))}
                  {!this.state.addTag ? (
                    <AddTag
                      onClick={() =>
                        this.setState({
                          addTag: true
                        })
                      }
                      className="btn-primary"
                    >
                      + interest
                    </AddTag>
                  ) : (
                    <Input>
                      {({ bind, value, set }) => (
                        <div className="input-group" style={{ width: 150 }}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="+ Interest"
                            aria-label="Add interest"
                            aria-describedby="basic-addon2"
                            {...bind}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => {
                                setUser(user.uid, {
                                  tags: [...(user.tags ? user.tags : []), value]
                                })
                                set('')
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </Input>
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
                    badgeclassName="fas fa-handshake"
                    badgeTitle="Total Friends"
                    badgeCount={totalFriends}
                  />
                  <AchievementListItem
                    badgeclassName="fas fa-money-check-alt"
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
}

export default Dashboard
