import AppointmentForm from '@/components/forms/AppointmentForm';

const BookAppointment = () => {
  return (
    <div className="flex flex-1  text-white p-6 rounded-lg shadow-lg">
      <div className="common-container space-y-6">

        {/* @ts-ignore */}
        <AppointmentForm type="create" />
      </div>
    </div>
  );
};

export default BookAppointment;