// @ts-nocheck


import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { data } from "./data";
import dayjs from "dayjs";

const Home = () => {
  const [state, setState] = useState<HTMLDivElement | null>(null);
  const [items, setItem] = useState<typeof sample | null>(null);
  const stepWidth = useMemo(
    () => Math.trunc((state?.offsetWidth || 0) / hours.length),
    [state]
  );

  console.log(
    data[30].classTime.split(" ").filter((item) => {
      if (item === "از" || item === "تا" || item === "") return false;
      return true;
    })
    , dayjs().day(2).hour(11).toDate()
  );
  return (
    <Box p={3} display={"flex"}>
      <List sx={{ width: 284 }}>
        <ListItemButton
          component="a"
          href="#simple-list"
          onMouseEnter={() => setItem(sample)}
          onMouseLeave={() => setItem(null)}
        >
          <ListItemText primary={sample.name} />
        </ListItemButton>
        <ListItemButton
          component="a"
          href="#simple-list"
          onMouseEnter={() => setItem(sample2)}
          onMouseLeave={() => setItem(null)}
        >
          <ListItemText primary={sample2.name} />
        </ListItemButton>
      </List>
      <Box flexGrow={1}>
        <Box display={"flex"} ref={setState} position={"relative"}>
          {hours.map((item, index) => (
            <Box key={index} id={`row-${index + 1}`} width={stepWidth}>
              {item}
            </Box>
          ))}

          {items && (
            <Card
              sx={{
                backgroundColor: "lightseagreen",
                height: 100,
                width: (items.end - items.start) * stepWidth,
                top: 21,
                left: (items.start - 7) * stepWidth,
                position: "absolute",
                p: 2,
              }}
            >
              <Typography variant="h6">{items.name}</Typography>
            </Card>
          )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {weekdays.map((item, index) => (
            <Box key={index} id={`row-${index + 1}`} height={100}>
              {item}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

const sample = {
  start: 7.5,
  end: 9.75,
  name: "ریاضی عمومی ۲",
};

const sample2 = {
  start: 13.5,
  end: 15.5,
  name: "فیزیک عمومی ۲",
};

const weekdays = [
  "شنبه",
  "یک شنبه",
  " دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
];

const hours = [
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
