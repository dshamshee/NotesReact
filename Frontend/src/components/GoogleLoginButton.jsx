import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useToastConfig } from "../utils/toastConfig";
import Cookies from 'js-cookie';
import { api } from '../utils/api';
// import { useMedia } from 'react-use';


const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const toastConfig = useToastConfig();
  // const isDark = useMedia("(prefers-color-scheme: dark)", false);

  const handleCredentialResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      
      // Send Google user data to your backend
      const res = await api.post('/user/google-login', {
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
        googleId: decoded.sub
      });

      if (res.status === 200 || res.status === 201) {
        // Set cookies with minimal restrictions for local development
        Cookies.set('token', res.data.token, {
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });
        Cookies.set('id', res.data.id, {
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });

        // Also store in localStorage as backup
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);

        toast.success("Google Login Successful", toastConfig);
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed", toastConfig);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <GoogleLogin
        onSuccess={handleCredentialResponse}
        onError={() => {
          toast.error("Google Login Failed", toastConfig);
        }}
        useOneTap
        type='standard'
        // theme={isDark ? "filled_black" : "filled_blue"}
        theme='filled_blue'
        size="medium"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
        
      />
    </div>
  );
};

export default GoogleLoginButton;
