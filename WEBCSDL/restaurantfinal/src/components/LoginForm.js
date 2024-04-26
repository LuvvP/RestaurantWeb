import '../style/style-login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ onLogin }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tạo một object chứa email và password để gửi đi
    const formData = {
      "user_name": email,
      "password": password
    };

    // Gửi POST request với formData
    fetch('http://127.0.0.1:5000/api/login-user', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // Xử lý phản hồi từ server (nếu có)
        if (data[1].role == "Quan Ly") {
            navigate('/main');
            onLogin(true, data[0].access_token) 
        }
      })
      .catch(error => {
        // Xử lý lỗi (nếu có)
        toast.error('Sai tài khoản hoặc mật khẩu', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        onLogin(false)
      });
  };

    return(
        <div className='mains'>
            
            <form action="" method="POST" className="form" id="form-2" onSubmit={handleSubmit}>
      <h3 className="heading">Đăng nhập</h3>
      <p className="desc" />
      <div className="spacer" />
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="VD: email@domain.com"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <span className="form-message" />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span className="form-message" />
      </div>
      <button className="form-submit" type="submit">Đăng nhập</button>
    </form>
    <ToastContainer />
        </div>


    )
}

export default LoginForm