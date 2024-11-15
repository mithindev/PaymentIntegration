import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { getAppointmentSchema } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useCreateAppointment } from "@/lib/react-query/queries";
import DatePicker from "react-datepicker";
import { Appointment } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@radix-ui/react-select";
import { Doctors } from "@/constants";

// type AppointmentFormProps = {
//   appointment?: Models.Document;
//   type: "create" | "schedule" | "cancel";
// };

const thottilDoctors = Doctors;

const AppointmentForm = ({
  appointment, 
  type, 
  setOpen, 
}: {
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "Mithin Doc",
      schedule: appointment ? new Date(appointment?.schedule!) : new Date(),
      reason: appointment ? appointment.reason : "this is workging",
      note: appointment?.note || "this is workging",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // Query
  const { mutateAsync: createAppointment, isLoading: isLoadingCreateAppointment } = useCreateAppointment();
  // const { mutateAsync: updatePost, isLoading: isLoadingUpdate } = useUpdatePost();

  // Handler
  const handleSubmit = async (value: z.infer<typeof AppointmentFormValidation>) => {
    const appointment = {
      userId: id,
      primaryPhysician: value.primaryPhysician,
      schedule: new Date(value.schedule),
      reason: value.reason || 'No reason provided',
      status: "pending",
      note: value.note,
    };

    console.log(appointment)
    //@ts-ignore
    const newAppointment = await createAppointment(appointment);
  
    console.log(newAppointment);

    if (!newAppointment) {
      toast({
        title: `${type} post failed. Please try again.`,
      });
    }
    navigate(`/success/${newAppointment!.$id}`);
  };
  

  return (
    <Form {...form}>
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="flex flex-col gap-9 w-full max-w-4xl p-8 bg-gray-900 shadow-xl rounded-lg border border-gray-700"
  >
    {type === "create" && (
      <section className="mb-8 text-center">
        {/* Marketing section */}
        <div className="bg-green-600 p-4 rounded-md text-center">
          <h2 className="text-2xl font-bold">Book Your Appointment Today</h2>

        </div>
      </section>
    )}

    {/* Primary Physician */}
    <FormField
      control={form.control}
      name="primaryPhysician"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xl font-semibold text-gray-300">
            Primary Physician
          </FormLabel>
          <FormControl>
            <select
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-150"
              {...field}
            >
              <option disabled selected>Select a doctor</option>
              {thottilDoctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage className="text-red-500 mt-2" />
        </FormItem>
      )}
    />

    {/* Appointment Schedule */}
    <FormField
      control={form.control}
      name="schedule"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xl font-semibold text-gray-300 px-10">
            Appointment Date and Time :
          </FormLabel>
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy - h:mm aa"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-150"
            />
          </FormControl>
          <FormMessage className="text-red-500 mt-2" />
        </FormItem>
      )}
    />

    {/* Reason and Note */}
    <div className={`flex flex-col gap-6 ${type === "create" && "xl:flex-row"}`}>
      {/* Reason */}
      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-gray-300">
              Reason for Appointment
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-150"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500 mt-2" />
          </FormItem>
        )}
      />

      {/* Note */}
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-gray-300">
              Additional Notes
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-150"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500 mt-2" />
          </FormItem>
        )}
      />
    </div>

    {/* Submit and Cancel buttons */}
    <div className="flex gap-4 items-center justify-end mt-6">
      <Button
        type="button"
        className="py-3 px-6 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-150"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
        disabled={isLoadingCreateAppointment}
      >
        {isLoadingCreateAppointment && (
          <Loader className="animate-spin mr-2" />
        )}
        Book Appointment
      </Button>
    </div>
  </form>
</Form>

  );
};

export default AppointmentForm;