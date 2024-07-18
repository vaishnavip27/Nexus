import "./addUser.css";

export default function AddUser() {
  return (
    <div className="AddUser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail"></div>
      </div>
    </div>
  );
}
