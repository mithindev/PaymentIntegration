import { Outlet, Navigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom"; // Hook for getting search parameters
import { useUserContext } from "../context/AuthContext"
// import { PasskeyModal } from "@/components/custom/PasskeyModal";

export default function AuthLayout() {
  // const [searchParams] = useSearchParams();
  // const isAdmin = searchParams.get('admin') === 'true'; // Getting admin param from URL
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {/* {isAdmin && <PasskeyModal />} */}
      
      {isAuthenticated ? (
        <Navigate to="/" />
        // console.log()
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/onboarding.webp"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}
