import React from 'react';
import { Container, Button, Icon, Item, Header } from 'semantic-ui-react'

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEvents extends React.Component {

  render() {
    const details = { color: 'grey' }
    return (
        <Container>
          <Header as='h1'>Past / Upcoming Waste Audits</Header>

          <Item.Group divided>
            <Item>
              <Item.Image src='/images/logo.png'/>

              <Item.Content>
                <Item.Header>University of Hawaii at Manoa</Item.Header>
                <Item.Meta>
                  <span className='details'>Keller Hall</span>
                </Item.Meta>
                <Item.Description>
                  Keller Hall
                  09/21/2018
                  8:30am to 1:30pm
                </Item.Description>
                <Item.Extra>
                  <Button primary floated='right'>
                    View
                    <Icon name='right chevron'/>
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>

            <Item>
              <Item.Image src='/images/logo.png'/>

              <Item.Content>
                <Item.Header>Kapiolani Community College</Item.Header>
                <Item.Meta>
                  <span className='details'>Olona Building</span>
                </Item.Meta>
                <Item.Description>
                  Olona Building
                  11/13/2018
                  8:30am to 1:30pm
                </Item.Description>
                <Item.Extra>
                  <Button primary floated='right'>
                    View
                    <Icon name='right chevron'/>
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>

            <Item>
              <Item.Image src='/images/logo.png'/>

              <Item.Content>
                <Item.Header>Leeward Community College</Item.Header>
                <Item.Meta>
                  <span className='details'>Building A</span>
                </Item.Meta>
                <Item.Description>
                  Building A
                  12/25/2018
                  8:30am to 1:30pm
                </Item.Description>
                <Item.Extra>
                  <Button primary floated='right'>
                    View
                    <Icon name='right chevron'/>
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>

        </Container>
    );
  }
}

export default ListEvents;