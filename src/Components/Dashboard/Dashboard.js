import './Dashboard.css'
import ProfileSection from './ProfileSection/ProfileSection'
import MakePost from './MakePost/MakePost'
import Posts from './Posts/Posts'
import Updates from './Updates/Updates'
import { useState,useEffect } from 'react'
import { db } from '../../firebase';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

export default function Dashboard() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
  
    try {
      let q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(10));
  
      if (lastPost) {
        q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), startAfter(lastPost), limit(10));
      }
  
      const snapshot = await getDocs(q);
  
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(newPosts)
      console.log('Fetched posts:', newPosts);
  
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLastPost(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch initial posts on component mount

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Load more posts when scrolled to bottom
      if (!loading) {
        fetchPosts();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='dash-cont'>
      <div className="dash-prof">
        <ProfileSection/>
      </div>
      <div className="post-cont">
        <MakePost/>
        <div className="posts">
        {posts.map(post => (
            <Posts
              key={post.id}
              id={post.id}
              caption={post.caption}
              postedBy={post.postedBy}
              timestamp={post.timestamp}
              photoUrl={post.photoUrl}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        {loading && <p>Loading more posts...</p>}
        </div>
      </div>
      <div className="choose-depar">
        <Updates/>
      </div>
    </div>
  )
}
