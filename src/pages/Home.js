import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    fetch("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((res) => res.json())
      .then((data) => setWorkflows(data));
  }, []);

  const x = console.log(workflows);
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="my-10">
        <div className="overflow-x-auto border rounded-lg">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Inpute Type</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {workflows.map((workflow) => (
                <tr key={workflow.id}>
                  <td className="hover:underline cursor-pointer">
                    <Link to={`/workflow/${workflow.id}`}>
                      {workflow?.name}
                    </Link>
                  </td>
                  <td>{workflow.input_type}t</td>
                  <td>{workflow.createdAt.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
