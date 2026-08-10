import type { User } from "../types/User";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="user-info">
        <h2>{user.name}</h2>

        <p className="username">@{user.username}</p>

        <div className="user-detail">
          <span>📧</span>
          <span>{user.email}</span>
        </div>

        <div className="user-detail">
          <span>📱</span>
          <span>{user.phone}</span>
        </div>

        <div className="user-detail">
          <span>📍</span>
          <span>{user.address.city}</span>
        </div>

        <div className="company">
          <span>🏢</span>
          <span>{user.company.name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;