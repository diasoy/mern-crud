import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
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
    <div className="flex w-full justify-center items-center mx-2">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-xl text-center mt-20">Edit Data</h1>
        <form onSubmit={updateUser} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="">Name</label>
            <div className="">
              <input
                type="text"
                className="border rounded px-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="">Email</label>
            <div className="">
              <input
                type="text"
                className="border rounded px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="">Gender</label>
            <div className="">
              <div className="border rounded px-2">
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
