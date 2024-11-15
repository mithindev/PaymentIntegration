import { decryptKey, encryptKey } from "@/lib/utils"; // Adjust the path based on your structure
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./bits/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./bits/input-otp";

export const PasskeyModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  // Access localStorage safely and decrypt the key
  const encryptedKey =
    typeof window !== "undefined" ? localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const adminPassKey = import.meta.env.VITE_ADMIN_PASSKEY; // Adjusted to use Vite's environment variable
    if (!adminPassKey) {
      console.error("ADMIN_PASSKEY is not defined in the environment variables.");
      return;
    }

    if (encryptedKey) {
      const accessKey = decryptKey(encryptedKey);
      if (accessKey === adminPassKey.toString()) {
        setOpen(false);
        navigate("/doctor");
        return;
      }
    }

    if (location.pathname === "/doctor-key") {
      setOpen(true);
    }
  }, [encryptedKey, location.pathname, navigate]);

  const closeModal = () => {
    setOpen(false);
    navigate("/sign-in");
  };

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const adminPassKey = import.meta.env.VITE_ADMIN_PASSKEY;

    if (!adminPassKey) {
      setError("Admin passkey is missing.");
      return;
    }

    if (passkey === adminPassKey) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      navigate("/doctor");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Doctor Access Verification
            <img
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the Thottil Doctor's page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot className="shad-otp-slot" key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="shad-primary-btn w-full"
          >
            Enter Doctor Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
