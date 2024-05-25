import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function LogList() {
  const [logs, setLogs] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/logs", {
          headers: { Authorization: "Bearer " + token },
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch logs: ", error);
      }
    };
    fetchLogs();
  }, [token]);

  return (
    <>
      <div className="flex justify-between items-center w-full mb-2 shadow-md p-2">
        <div>Logs</div>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID Log</th>
              <th>Type Log</th>
              <th>Pesan</th>
              <th>Waktu</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <Fragment>
              {logs.map((log) => (
                <tr key={log.id_log}>
                  <td>{log.id_log}</td>
                  <td>{log.type_log}</td>
                  <td>{log.pesan}</td>
                  <td>{new Date(log.waktu).toLocaleString()}</td>
                </tr>
              ))}
            </Fragment>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LogList;
