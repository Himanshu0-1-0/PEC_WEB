import './Dashboard.css'
import ProfileSection from './ProfileSection/ProfileSection'
import MakePost from './MakePost/MakePost'
import Posts from './Posts/Posts'

export default function Dashboard() {
  return (
    <div className='dash-cont'>
      <div className="dash-prof">
        <ProfileSection/>
      </div>
      <div className="post-cont">
        <MakePost/>
        <div className="posts">
        <Posts/>
        <Posts/>
        </div>
      </div>
      <div className="choose-depar">
        d
      </div>
    </div>
  )
}
