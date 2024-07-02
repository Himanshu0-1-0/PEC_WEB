import "./Updates.css"

export default function Updates() {
  return (
    <div className="updates-cont">
      <div className="updt-logo">
        <img src="/PEC_WEB.png" alt="Logo" />
      </div>
      <div className="updt-content">
        <div className="dd1">
            <h2>Explore Department Updates</h2>
        </div>
        <div className="dd2">
        <p >
            Don't miss out on important updates! Explore now to stay connected with your department and make the most of your time here.
        </p>
        </div>     
        <div className="updt-btn">
        <button type="button" class="btn ">Explore Department Updates.. </button>
        </div>
        <button type="button" class="btn btn-danger">Manage Authority..</button>
      </div>
    </div>
  )
}
