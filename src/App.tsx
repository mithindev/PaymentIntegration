import { Routes, Route } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Register from "./_root/pages/Register";
import DoctorLayout from "./_doctor/DoctorLayout";
import AdminPage from "./_doctor/pages/AdminPage";
import Feature1 from "./_root/pages/Feature1";
import Success from "./_root/pages/Success";
import Prenatal from "./_root/pages/results/Prenatal";
import BookAppointment from "./_root/pages/BookAppointment";
import Test from "./_root/pages/results/_test";
import Admin from "./_doctor/pages/Admin";
import ReportAnalysis from "./_root/pages/ReportAnalysis";
import ExercisePlan from "./_root/pages/ExercisePlan";
import Exercise from "./_root/pages/results/Exercise";
import DietPlan from "./_root/pages/results/DietPlan";
import DietPlanPage from "./_root/pages/DietPlanPage";
import { Analytics } from '@vercel/analytics/next';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* //! Doc Route */}
        <Route element={<DoctorLayout />}>
          <Route path="/doctor-key" element={<AdminPage />} />
          <Route path="/doctor" element={<Admin />} />
        </Route>
        {/* //! Doc Route */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/community" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/write-article" element={<CreatePost />} />
          <Route path="/update-article/:id" element={<EditPost />} />
          <Route path="/articles/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/bookappointment/:id" element={<BookAppointment />} />
          <Route path="/report-analysis/:id" element={<ReportAnalysis />} />
          
          <Route path="/test/:id" element={<Test />} />

          {/* //* THOTTIL FEATURES */}
          <Route path="/pre-preg-analysis/:id" element={<Feature1 />} />
          <Route path="/exercise-plan/:id" element={<ExercisePlan />} />
          <Route path="/diet-plan/:id" element={<DietPlanPage />} />

          {/* //? THOTTIL FEATURES OUTPUT */}

          <Route path="/genai/pna" element={<Prenatal />} />
          <Route path="/genai/exercise" element={<Exercise />} />
          <Route path="/genai/dietplan" element={<DietPlan />} />

          {/* //? THOTTIL FEATURES OUTPUT */}
 
          {/* //* THOTTIL FEATURES */}

        </Route>
        <Analytics />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
