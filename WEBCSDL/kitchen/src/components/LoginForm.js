import '../style/style-login.css'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from './TokenContext.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ onLogin }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let isLogin = false;
    let tokenLogin = '';
    const [token, setToken] = useState(null);

    useEffect(() => {
      if (token) {
        // Thực hiện các hành động sau khi token thay đổi
        console.log(token);
        // Các hành động khác...
      }
    }, [token]);

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = {
        "user_name": email,
        "password": password
      };

      fetch('http://127.0.0.1:5000/api/login-user', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data[1].role === "Quan Ly" || data[1].role === "Dau Bep") {
            setToken(data[0].access_token)
            isLogin = true
            tokenLogin = data[0].access_token;
            onLogin(true, data[0].access_token); // Cập nhật trạng thái đăng nhập và token
          }
        })
        .catch(error => {
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
          console.error(error);
          onLogin(false); // Cập nhật trạng thái đăng nhập (nếu cần)
        });
    };
    if(isLogin) {
      navigate('/main');
      console.log(token)
    }

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