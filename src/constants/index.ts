export const sidebarLinks = [
  // {
  //   imgURL: "/assets/icons/home.svg",
  //   route: "/",
  //   label: "Home",
  // },
  // {
  //   imgURL: "/assets/icons/wallpaper.svg",
  //   route: "/explore",
  //   label: "Explore",
  // },
  {
    imgURL: "/assets/icons/community.png",
    route: "/community",
    label: "Community",
  },
  // {
  //   imgURL: "/assets/icons/prenatal.png",
  //   route: "/pre-preg-analysis/:userId", // Dynamic user ID path
  //   label: "Prenatal Analysis",
  // },
  // {
  //   imgURL: "/assets/icons/cloud.png",
  //   route: "/report-analysis/:userId",
  //   label: "Cloud",
  // },
  // {
  //   imgURL: "/assets/icons/exercise.png",
  //   route: "/exercise-plan/:userId",
  //   label: "Exercise",
  // },
  // {
  //   imgURL: "/assets/icons/diet.png",
  //   route: "/diet-plan/:userId",
  //   label: "Diet Plan",
  // },
  {
    imgURL: "/assets/icons/appointment.png",
    route: "/bookappointment/:userId",
    label: "Book Appointment",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/test/:userId",
    label: "Test",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/check.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/bookappointment/:userId",
    label: "Book Appointment",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/pre-preg-analysis/:userId", // Dynamic user ID path
    label: "PPA",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/report-analysis/:userId",
    label: "repo",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/exercise-plan/:userId",
    label: "Exercise",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/test/:userId",
    label: "Test",
  },
  {
    imgURL: "/assets/icons/check.svg",
    route: "/diet-plan/:userId",
    label: "Diet Plan",
  },
];

//! MD CONSTANTS
export const GenderOptions = ["Male", "Female", "Other"];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Mithin Doc",
  },
  {
    image: "/assets/images/dr-green.png",
    name: "Mithin Doc",
  },
  {
    image: "/assets/images/dr-green.png",
    name: "Mithin Doc",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};