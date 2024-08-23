// @ts-nocheck
import moment from "moment-jalaali";
import "moment/locale/fa";
import { data } from "./data";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { List } from "./List";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";

moment.loadPersian();

const localizer = momentLocalizer(moment);

const Login = () => {
  const currentDate = moment();
  return (
    <div>
      {/* <List /> */}
      {/* <Calendar
        localizer={localizer}
        events={[
          {
            title: data[0].courseName,
            ...parsePersianDate(data[0].classTime),
          },
          {
            title: data[6].courseName,
            ...parsePersianDate(data[7].classTime),
          },
        ]} // Add your events here
        startAccessor="start"
        endAccessor="end"
        date={currentDate.toDate()}
        style={{ height: 700, flexGrow: 1 }}
        defaultView="week"
        view="week"
        views={{ week: true }}
      /> */}

      <Box p={3} bgcolor={"common.white"}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "4px",
            bgcolor: "grey.100",
            pl: "184px",
          }}
        >
          {timeIntervals.map((interval, index) => (
            <Typography
              component={"div"}
              variant="caption"
              key={index}
              flex={1}
            >
              {interval}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", width: "100%", pl: "184px" }}>
          {Array.from({ length: 72 }).map((_, i) => (
            <Box
              sx={{
                borderInlineEnd: "1px solid #d4d4d4",
                height: 40,
                flex: 1,
                backgroundColor: i % 3 === 0 ? "red" : "none",
                borderBlock: "1px solid #d4d4d4",
              }}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Login;

const parsePersianDate = (persianDateString: string) => {
  // Extract day, start time, and end time from the Persian date string
  const match = persianDateString.match(/(\S+)\s+از\s+(\S+)\s+تا\s+(\S+)/);

  // Check if the match is found
  if (!match) {
    // Return null or throw an error, depending on your requirements
    return null;
  }

  // Destructure the match array to extract day, start time, and end time
  const [, day, startTime, endTime] = match;

  // Convert Persian day name to its corresponding English day name
  const dayIndex =
    [
      "شنبه",
      "یک‌شنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
    ].indexOf(day) - 1;

  // Get the current date and time in the Persian calendar
  const currentDate = moment();

  // Calculate the offset for the target day
  const targetDayOffset = (dayIndex - currentDate.day() + 7) % 7;

  // Calculate the target date by adding the offset to the current date
  const targetDate = currentDate.add(targetDayOffset, "days");

  // Split start and end times into hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Set the time for the start and end of the event
  const startDateTime = moment(targetDate).set({
    hour: startHour,
    minute: startMinute,
  });
  const endDateTime = moment(targetDate).set({
    hour: endHour,
    minute: endMinute,
  });

  // Return an object containing start and end properties
  return { start: startDateTime.toDate(), end: endDateTime.toDate() };
};
