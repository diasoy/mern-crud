import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="">
        <h1 className="font-bold text-xl my-5">Data Orang</h1>
        <Link to="add" className="bg-sky-100 px-3 py-1 rounded-lg">
          Add New
        </Link>
        <table className="mt-4">
          <thead>
            <tr className="border px-2 py-2">
              <th className="border px-2 py-2">No</th>
              <th className="border px-2 py-2">Name</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Gender</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="border px-2 py-2">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-2 py-2">{index + 1}</td>
                <td className="border px-2 py-2">{user.name}</td>
                <td className="border px-2 py-2">{user.email}</td>
                <td className="border px-2 py-2">{user.gender}</td>
                <td className="border px-2 py-2">
                  <Link
                    to={`edit/${user._id}`}
                    className="mx-1 bg-yellow-500 px-2 text-white rounded-md"
                  >
                    Edit
                  </Link>
                  |
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="mx-1 bg-red-500 px-2 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
