import "./DepartmentUpdates.css"
import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust the import according to your project structure
import { collection, query, where, getDocs } from "firebase/firestore";
import Post from "../Dashboard/Posts/Posts"; // Adjust the import according to your project structure
import { useParams } from "react-router-dom";
import MakePost from "../Dashboard/MakePost/MakePost";
const DepartmentUpdates = () => {
  const { department, year } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(`Fetching updates for department: ${department}, year: ${year}`);
        
        // Fetch matching department updates
        const updatesQuery = query(
          collection(db, "department_updates"),
          where("department", "==", department),
          where("year", "==", year)
        );

        const updatesSnapshot = await getDocs(updatesQuery);
        const postIds = updatesSnapshot.docs.map(doc => doc.data().post);

        console.log("Fetched post IDs:", postIds);

        if (postIds.length === 0) {
          setPosts([]);
          setLoading(false);
          return;
        }

        // Function to fetch posts in batches
        const fetchPostsInBatches = async (postIds) => {
          const fetchedPosts = [];
          for (let i = 0; i < postIds.length; i += 10) {
            const batchIds = postIds.slice(i, i + 10);
            const postsQuery = query(
              collection(db, "posts"),
              where("__name__", "in", batchIds) 
            );
            const postsSnapshot = await getDocs(postsQuery);
            const batchPosts = postsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            fetchedPosts.push(...batchPosts);
          }
          return fetchedPosts;
        };

        const fetchedPosts = await fetchPostsInBatches(postIds);
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [department, year]);

  return (
    <div className="conoo">
        <MakePost/>
      {posts.map(post => (
        <Post
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

export default DepartmentUpdates;
