import { columns } from '@/components/custom/bits/columns';
import { DataTable } from '@/components/custom/DataTable';
import { StatCard } from '@/components/ui/md/StatCard';
import { useGetAllAppointments } from '@/lib/react-query/queries';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { data: appointments } = useGetAllAppointments();

  if (!appointments)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  
    console.log(appointments.documents)

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-10">
      {/* Header Section */}
      <header className="flex justify-between items-center pb-6 border-b border-gray-300">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/images/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-auto"
          />
        </Link>
        <p className="text-lg font-semibold text-white-800">Doctor Dashboard</p>
      </header>

      {/* Main Content */}
      <main className="space-y-12">
        {/* Welcome Section */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white-800">Welcome 👋</h1>
          <p className="text-lg text-white-600">
            Start your day by managing the new appointments.
          </p>
        </section>

        {/* Stat Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
