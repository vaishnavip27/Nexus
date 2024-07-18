import "./chatList.css";
import pfImage from "../../../pictures/profile-2.png";
import AddUser from "../userInfo/addUser/addUser";

export default function ChatList() {
  return (
    <div className="ChatList">
      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>

      <div className="item">
        <img src={pfImage} alt="profile-1" className="pfp" />
        <div className="texts">
          <span>Vaishnavi Patil</span>
          <p>Hello there!</p>
        </div>
      </div>
    </div>
  );
}
