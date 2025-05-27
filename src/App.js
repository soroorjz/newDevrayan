import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import ExamInfo from "./pages/ExamInfo/ExamInfo";
import ExamSignUpForm from "./pages/ExamSignUpForm/ExamSignUpForm";
import Home from "./pages/HomePage/Home";
import LogIn from "./pages/LogIn/LogIn";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPassPage from "./pages/ForgotPasswordPage/ResetPass/ResetPassPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReportForm from "./pages/ReportForm/ReportForm";
import EmploymentTests from "./pages/EmploymentTests/EmploymentTests";
import ReportTracking from "./pages/ReportTracking/ReportTracking";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ForgotPassword from "./components/LogInComp/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ExamInfoSkeleton from "./pages/ExamInfo/ExamInfoSkeleton";
import ExamCardSkeleton from "./pages/EmploymentTests/ExamCardSkeleton";
import CardListSkeleton from "./components/HomePageComp/ExamCardPart/CardListSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<CardListSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signUpForm"
              element={
                <ExamSignUpForm
                  title="ساخت حساب کاربری "
                  showNavbar={true}
                  successMessage="ثبت نام با موفقیت انجام شد!"
                />
              }
            />
            <Route path="/examInfo/:id" element={<ExamInfo />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ReportForm" element={<ReportForm />} />
            <Route path="/EmploymentTests" element={<EmploymentTests />} />
            <Route path="/ReportTracking" element={<ReportTracking />} />
            <Route path="/RegistrationPage" element={<RegistrationPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
