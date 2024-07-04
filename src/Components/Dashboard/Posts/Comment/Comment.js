import "./Comment.css"

export default function Comment({profilePic,name,timestamp,content}) {
  const formattedTimestamp2 = new Date(timestamp.seconds * 1000).toLocaleString();
  return (
    <div className= "comm-cont ">
      <img src={profilePic} alt="Profile" className="cscs" />
      <div className="cont21 border-bottom">
        <div className="cnoc-cont">
          <div className="cnoc">
            {name}
          </div>
          <div className="toto">
          {formattedTimestamp2}
        </div>
        </div>
        <div className="snknfk">
          {content}
        </div>
      </div>
    </div>
  )
}
