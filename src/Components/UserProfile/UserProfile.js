import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Posts from '../Dashboard/Posts/Posts';
import './UserProfile.css';

const UserProfile = () => {
  const { userPosts } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from Firestore based on the userPosts array
        if (userPosts.length > 0) {
          const postsQuery = query(
            collection(db, 'posts'),
            where('__name__', 'in', userPosts)
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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userPosts]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p>No posts found for the current user.</p>;
  }

  return (
    <div className="scfssf">
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
    </div>
  );
};

export default UserProfile;
