import { Button } from "@/components/ui";
import { Doctors } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useGetAppointmentById, useGetUserAppointments } from "@/lib/react-query/queries";
import { formatDateTime } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const Success = () => {
  const { id } = useParams(); 
  const { user } = useUserContext();

  const { data: appointment, isLoading, error } = useGetAppointmentById(id);

  const { data: userAppointments, isLoading: isUserAppointmentLoading, error: userAppointmentsError } = useGetUserAppointments(appointment?.userid || "");

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  if (isLoading || isUserAppointmentLoading) {
    return <div>Loading...</div>;
  }

  if (error || userAppointmentsError) {
    return <div>There was an error loading the appointment. Please try again later.</div>;
  }

  if (!appointment || !doctor) {
    return <div>No appointment or doctor information available</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full px-5 md:px-10 bg-gray-900 text-white">
      <div className="w-full flex flex-col items-center space-y-6">
        <Link to="/" className="self-start">
          <img
            src="/assets/icons/logo-icon.svg"
            height={40}
            width={160}
            alt="Thottil Logo"
            className="h-10 w-auto"
          />
        </Link>

        <section className="flex flex-col items-center space-y-4">
          <img
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="Success"
          />
          <h2 className="text-2xl font-semibold text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-gray-400">We'll be in touch shortly to confirm.</p>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg w-full space-y-4">
          <p className="text-lg font-semibold">Requested Appointment Details:</p>
          
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap text-xl">Dr. {doctor.name}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="Calendar Icon"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="mt-6 border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-900">
          <Link to={`/bookappointment/${user?.id}`}>
            Book Another Appointment
          </Link>
        </Button>

        <p className="text-gray-500 text-sm mt-4">© 2024 Thottil</p>
      </div>
    </div>
  );
};

export default Success;
