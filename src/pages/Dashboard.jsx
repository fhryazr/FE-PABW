import UserList from "../components/admin/UserList";
import DashboardLayout from "./DashboardLayout";

function Dashboard() {
  return (
    <div>
      <DashboardLayout>
        <UserList />
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
