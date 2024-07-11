import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs,orderBy } from 'firebase/firestore';
import Posts from '../Dashboard/Posts/Posts';
import './UserProfile.css';

const UserProfile = () => {
  const { userPosts,currentUser,isAuthority } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from Firestore based on the userPosts array
        if (userPosts.length > 0) {
          const postsQuery = query(
            collection(db, 'posts'),
            where('__name__', 'in', userPosts),
            orderBy('timestamp', 'desc') // Order by timestamp in descending order
          ); 

          const postsSnapshot = await getDocs(postsQuery);
          const fetchedPosts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(fetchedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, [userPosts]);

  
  if (error) {
    return <h1 className='sdfsfa'>Error: {error}</h1>;
  }

  
  let yearPart = currentUser.displayName.substring(2, 4);

  // Convert it to an integer
  let year = parseInt(yearPart);

  // Calculate the batch
  let batchStart = 2000 + year;
  let batchEnd = batchStart + 4;
  let batch = `${batchStart}-${batchEnd}`;

  let parts = currentUser.displayName.split(" ");
  let name = parts[1];
  let SID = parts[0].substr(2,);

  return (
    <div className="scfssf">
      <div className="secp1">
        <div className="pwpw">
          <img src="/PEC.png" alt="Pec_Logo" className='ss-img' />
        </div>
        <div className="sdsda">
          <div className="spsp">
            <img src={currentUser.photoURL} alt="User pic" className='swa' />
            
            <div className='plp'>{name}</div>
            <div className='plp ppl'>{currentUser.email}</div>
          </div>
          <div className="slsl">
          <div className='alal'>Batch: {batch}</div>
          <div className='alal'>Sid: {SID}</div>
              <div className='alal'>No. of Posts- {userPosts.length}</div>
              <div className='alal'>Authority: {isAuthority?"Yes":"No"}</div>
             
          </div>
        </div>
      </div>
      <div className="dldd">
      {posts.length !== 0?posts.map(post => (
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
      )):undefined}
      </div>
    </div>
  );
};

export default UserProfile;
