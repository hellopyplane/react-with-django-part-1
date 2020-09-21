import React, {useState, useEffect} from 'react';
import {Button, Spinner, Alert} from 'react-bootstrap'
import Post from './Post';
import axios from 'axios'

let myPosts = [
    {
        id: 0,
        title: 'post 1',
        description: 'description post 1',
        liked : false,
        likes: 0,
    },
    {
        id: 1,
        title: 'post 2',
        description: 'description post 2',
        liked : false,
        likes: 0,
    },
    {
        id: 2,
        title: 'post 3',
        description: 'description post 3',
        liked : false,
        likes: 0,
    },
    {
        id: 3,
        title: 'post 4',
        description: 'description post 4',
        liked : false,
        likes: 0,
    },
    {
        id: 4,
        title: 'post 5',
        description: 'description post 5',
        liked : false,
        likes: 0,
    },
    {
        id: 5,
        title: 'post 6',
        description: 'description post 6',
        liked : false,
        likes: 0,
    },
    {
        id: 6,
        title: 'post 7',
        description: 'description post 7',
        liked : false,
        likes: 0,
    },
    {
        id: 7,
        title: 'post 8',
        description: 'description post 8',
        liked : false,
        likes: 0,
    },
    {
        id: 8,
        title: 'post 9',
        description: 'description post 9',
        liked : false,
        likes: 0,
    }
]

const Posts = () => {
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [visible, setVisible] = useState(3)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        getData()
    },[])

    const getData = () => {
        setPosts(myPosts)
        const url = 'https://randomuser.me/api/?results=9'
        axios.get(url)
            .then(res=>{
                let data = res.data.results
                data.forEach((item, index)=>{
                    item['id'] = index
                })
                console.log(data)
                setUsers(data)
            })
            .then(()=>setLoaded(true))
            .catch(err=>{
                console.log('ups...we have an error', err)
            })
    }

    const handleShowMorePosts =()=>{
        setVisible(visible+3)
    }

    const handleLike=(id)=>{
        const cposts = [...posts]
        cposts.forEach(post=>{
            if(post.id===id) {
                if(post.liked) {
                    post.liked = false
                    post.likes -= 1
                } else {
                    post.liked = true
                    post.likes += 1
                }
            }
        })
        setPosts(cposts)
    }

    const handleDeletePost = (id) => {
        const cposts = posts.filter(post=> post.id !== id)
        const cusers = users.filter(user=> user.id !== id)
        setPosts(cposts)
        setUsers(cusers)
    }

    return ( 
        <div className="mt-3 mb-3">
            {loaded && posts.length > 0 && <Alert variant='success'>All posts are loaded ...</Alert>}
            {!loaded ? <Spinner animation="border" /> 
            :
            posts.slice(0, visible).map((post,index)=>{
                return <Post 
                            key={post.id}
                            index={index}
                            users={users}
                            title={post.title}
                            description={post.description}
                            likes={post.likes}
                            liked={post.liked}
                            likePost={()=>handleLike(post.id)}
                            delete={()=>handleDeletePost(post.id)}
                        />
            })
            }
            <br />
            {(loaded && posts.length <= visible)
            ?
            posts.length > 0 ? <h3>No more posts to load</h3> : <h3>No posts here...</h3> 
            :
            loaded && <Button 
                variant='warning'
                onClick={handleShowMorePosts}
                >
                Load more posts
            </Button>
            }
        </div>
     );
}
 
export default Posts;