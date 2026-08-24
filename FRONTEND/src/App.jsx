import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import DashBoardPage from "./pages/DashBoardPage";
import { Loader } from "lucide-react";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, user} = useAuthStore();
    
    if(!isAuthenticated) {
      return <Navigate to='/login' replace/>
    }

    if(!user.isVerified) {
      return <Navigate to='/verify-email' replace/>
    }
    
    return children;
}

function App() {
  const {isCheckingAuth, checkAuth, user, isAuthenticated} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(isCheckingAuth);
  console.log(isAuthenticated);
  console.log(user);

  if(isCheckingAuth) return <div className="h-screen w-full bg-gradient-to-b from-red-600 to-blue-400 flex justify-center items-center"><Loader className="h-40 w-40 animate-spin"/></div>


  return (
    <div className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <DashBoardPage/>
        </ProtectedRoute>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/verify-email' element={<EmailVerificationPage/>}></Route>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
        <Route path='/reset-password/:token' element = {<ResetPasswordPage/>}></Route>
        <Route path='*' element = {<Navigate to='/' replace/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
