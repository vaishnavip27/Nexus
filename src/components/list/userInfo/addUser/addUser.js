import "./addUser.css";
import userImg from "../../../../pictures/profile-1.png";

export default function AddUser() {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="user">
          <img src={userImg} alt="user-img"></img>
          <span>Vaishnavi Patil</span>
        </div>
        <button>Add user</button>
      </div>
    </div>
  );
}
