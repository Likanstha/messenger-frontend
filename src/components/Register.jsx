import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../store/actions/authAction';
import { toast } from 'react-toastify';

const Register = () => {
  const [state, setstate] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const navigate = useNavigate();
  const [loadImage, setLoadImage] = useState('');
  const dispatch = useDispatch();

  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const showToast = () => {
      if (successMessage) {
        toast.success(successMessage);
      }
      if (error) {
        error.map((err) => toast.error(err));
      }
    };

    showToast(); // Show notifications immediately

    if (authenticate) {
      // Wait for 5 seconds before navigating
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 5000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, error, authenticate, navigate]);

  const inputHendle = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHendle = (e) => {
    if (e.target.files.length !== 0) {
      setstate({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword, image } = state;
    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', image);

    dispatch(userRegister(formData));
  };

  return (
    <>
      <div>
        <h1>This is Regiser Page </h1>
      </div>
      <div className="register">
        <div className="card">
          <div className="card-header">
            <h3>Register</h3>
          </div>

          <div className="card-body">
            <form onSubmit={register}>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  onChange={inputHendle}
                  name="userName"
                  value={state.userName}
                  className="form-control"
                  placeholder="User Name"
                  id="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={inputHendle}
                  name="email"
                  value={state.email}
                  className="form-control"
                  placeholder="Email"
                  id="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={inputHendle}
                  name="password"
                  value={state.password}
                  className="form-control"
                  placeholder="Password"
                  id="password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  onChange={inputHendle}
                  name="confirmPassword"
                  value={state.confirmPassword}
                  className="form-control"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                />
              </div>

              <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {loadImage ? <img src={loadImage} /> : ''}
                  </div>
                  <div className="file">
                    <label htmlFor="image">Select Image</label>
                    <input
                      type="file"
                      onChange={fileHendle}
                      name="image"
                      className="form-control"
                      id="image"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="register"
                  className="btn"
                />
              </div>

              <div className="form-group">
                <span>
                  <Link to="/messenger/login"> Login Your Account </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
