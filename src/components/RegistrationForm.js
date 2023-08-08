import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../redux/UserSlice';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addresses, setAddresses] = useState(['']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password.length>0 && confirmPassword.length>0){
      if (password !== confirmPassword) {
        setPasswordMatchError(true);
        return;
      }
    }
   
 

    const newUser = {
      id: Date.now(),
      name,
      age,
      dob,
      phoneNumber,
      addresses,
      password,
    };

    if (editingUserId) {
      dispatch(updateUser({ id: editingUserId, updatedUser: newUser }));
      setEditingUserId(null);
    } else {
      dispatch(addUser(newUser));
    }

    // Reset the form fields
    setName('');
    setAge('');
    setDob('');
    setPhoneNumber('');
    setAddresses(['']);
    setPassword('');
    setConfirmPassword('');
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setAge(user.age);
    setDob(user.dob);
    setPhoneNumber(user.phoneNumber);
    setAddresses(user.addresses);
    setPassword(user.password);
    setConfirmPassword(user.password);
    setEditingUserId(user.id);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, '']);
  };

  const handleRemoveAddress = (index) => {
    if (addresses.length === 1) return;
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Registration Form</h2>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={20}
            pattern="[A-Za-z\s]+"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age*</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of birth*</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number*</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{8,10}"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addresses">Address*</label>
          {addresses.map((address, index) => (
            <div key={index} className="address-group">
              <input
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveAddress(index)}>
                  -
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddAddress}>
            +
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={10}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password*</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={10}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+"
          />
          {passwordMatchError && password && confirmPassword && <p style={{color:"red"}}>{"Password doesnot match"} </p>}
        </div>
        <button type="submit" className="submit-button">
          {editingUserId ? 'Update' : 'Submit'}
        </button>
      </form>
      <h2>Registered Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.dob}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.addresses.join(', ')}</td>
              <td>
                <button style={{background:"green"}} onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationForm;
