import React from 'react';
import {Card, Button, Image} from 'react-bootstrap'

const Post = props => {
    return ( 
        <Card style={{ width:'50%', margin: '0 auto'}} className='mb-3'>
            <Card.Body>
                <Image src={props.users[props.index].picture.medium} roundedCircle />
                <Card.Text>{props.users[props.index].name.first}</Card.Text>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Button
                    variant='primary'
                    className="mr-1"
                    onClick={props.likePost}
                    >
                    {props.liked? 'Unlike' : 'Like'}
                </Button>
                <Button
                    variant='danger'
                    className="ml-1"
                    onClick={props.delete}
                    >
                    Delete
                </Button>
                <Card.Text>{props.likes}</Card.Text>
            </Card.Body>

        </Card>
     );
}
 
export default Post;