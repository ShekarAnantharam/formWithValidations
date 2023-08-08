import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../redux/userSlice";
import "./UserTable.css"; // Import UserTable styles

const UserTable = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    age: "",
    dob: "",
    phone: "",
    addresses: [""],
    password: "",
    confirmPassword: "", 
  });
  const [editedUsers, setEditedUsers] = useState([]);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    users.filter((user) => {
      if (user.id == userId) {
        setEditUser({
          id: userId,
          name: user.name,
          age: user.age,
          dob: user.dob,
          phone: user.phone,
          addresses: user.addresses,
          password: user.password,
          confirmPassword: user.confirmPassword,
        });
      }
    });
  };

  const handleSave = (userId, updatedUser) => {
    dispatch(updateUser({ id: userId, updatedUser }));
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleInputChange = (event, userId, field, index) => {
    const updatedValue = event.target.value;
    console.log(event);
    // const updatedUsers = users.map((user) => {
    //   if (user.id === userId) {
    //     return { ...user, [field]: updatedValue };
    //   }
    //   return user;
    // });
    const { name, value } = event.target;
    console.log("name value", name, value)

    if (name === "addresses") {
      const addresses = [...editUser.addresses];
      addresses[index] = value;
      setEditUser({ ...editUser, addresses });
    } else {
      setEditUser({ ...editUser, [name]: value });
    }
    // Update the Redux store with the updatedUsers array
    // (dispatch an action or update the Redux store directly)
  };

  console.log("edituser", editUser);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Age</th>
            <th className="table-header">Date of Birth</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">Addresses</th>
            <th className="table-header">Password</th>
            {editingUserId ? (
              <th className="table-header">ConfirmPassword</th>
            ) : null}

            <th className="table-header" style={{ border: 0 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) => handleInputChange(e, user.id, "name")}
                    className="form-input"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="number" // Use type "number" for age input
                    value={editUser.age}
                    onChange={(e) => handleInputChange(e, user.id, "age")}
                    className="form-input"
                  />
                ) : (
                  user.age
                )}
              </td>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="date" // Use type "date" for date of birth input
                    value={editUser.dob}
                    onChange={(e) => handleInputChange(e, user.id, "dob")}
                    className="form-input"
                  />
                ) : (
                  user.dob
                )}
              </td>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="tel" // Use type "tel" for phone number input
                    value={editUser.phone}
                    onChange={(e) => handleInputChange(e, user.id, "phone")}
                    className="form-input"
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td className="table-data">
                {/* user.addresses.map((address, index) => (
            <div key={index}>
              <input
                type="text"
                name="addresses"
                value={address}
                onChange={(e) => handleInputChange(e, index)}
                className="form-input"
                required
              /> */}
                {editingUserId === user.id
                  ? (editUser.addresses.map((address, index) => {
                    {console.log("inbetween edit user",editUser)}
                      <div key={index}>
                        <input
                          type="text"
                          name="addresses"
                          value={address}
                          onChange={(e) =>
                            handleInputChange(e, user.id, "addresses", index)
                          }
                          className="form-input"
                        />
                      </div>;
                    }))
                  : user.addresses}
              </td>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    value={editUser.password}
                    onChange={(e) => handleInputChange(e, user.id, "password")}
                    className="form-input"
                  />
                ) : (
                  <span className="security-placeholder">********</span>
                )}
              </td>
              <td className="table-data">
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    value={editUser.confirmPassword}
                    onChange={(e) =>
                      handleInputChange(e, user.id, "confirmPassword")
                    }
                    className="form-input"
                  />
                ) : (
                  <span className="security-placeholder">********</span>
                )}
              </td>

              <td>
                {editingUserId === user.id ? (
                  <>
                    <button
                      className="save-button"
                      onClick={() => handleSave(user)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingUserId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
