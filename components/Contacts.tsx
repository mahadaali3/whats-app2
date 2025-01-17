import { User } from "@/lib/actions/user.actions";
import Link from "next/link";

function Contacts({ users, path }: { users: User[]; path: string }) {
  return (
    <div>
      {users.map((user: User) => {
        let currentUser: User = {
          id: user.id,
          username: user.username,
          name: user.name,
          image: user.image,
          path: user.path,
        };
        return (
          <div key={user.id}>
            <Link href={`${path}/${currentUser.id}`}>
              {currentUser.username}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default Contacts;
