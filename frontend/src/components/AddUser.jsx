import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center items-center mx-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl text-center mt-20">Tambah Data</h1>
          <form onSubmit={saveUser} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <label className="label">Name</label>
              <div className="border rounded px-2">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="label">Email</label>
              <div className="border rounded px-2">
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="label">Gender</label>
              <div className="border rounded px-2">
                <div className="select is-fullwidth">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 px-3 py-1 rounded-md text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
