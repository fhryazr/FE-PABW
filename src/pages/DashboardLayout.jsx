/* eslint-disable react/prop-types */
// Layout.js

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <main className="w-full">{children}</main>
    </div>
  );
}

export default DashboardLayout;
