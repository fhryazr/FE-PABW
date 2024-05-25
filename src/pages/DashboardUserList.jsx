import UserList from "../components/admin/UserList";
import DashboardLayout from "./DashboardLayout";

export default function DashboardUserList() {
  return (
    <div>
      <DashboardLayout>
        <UserList />
      </DashboardLayout>
    </div>
  );
}

