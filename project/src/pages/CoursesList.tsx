//@ts-nocheck

import { useCallback, useMemo, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Course, courses } from "../core/data";
import {
  Alert,
  AlertTitle,
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useSnackbar, SnackbarProvider } from "notistack";
import { Download, Visibility } from "@mui/icons-material";
import { toPng } from "html-to-image";

const CoursesList = () => {
  const [state, setState] = useState<Course[] | []>([]);
  const element = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const series = useMemo(() => {
    return [
      {
        name: "Class Schedule",
        data: state,
      },
    ];
  }, [state]);

  const options: ApexOptions = {
    chart: {
      type: "rangeBar",
      animations: { enabled: false },
      fontFamily: "IRANYekanX, Arial, sans-serif",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -10,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      events: {
        dataPointSelection: function (event, chartContext, configs) {
          // Remove the selected data point

          const selectedItem = configs?.w?.config?.series[0]?.data?.[
            configs.dataPointIndex
          ] as Course;

          setState(
            configs?.w?.config?.series[0]?.data.filter(
              (item: Course) => item[""] !== selectedItem[""]
            )
          );
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        borderRadius: 10,
        barHeight: "80%",
        dataLabels: {
          hideOverflowingLabels: false,
        },
      },
    },
    dataLabels: {
      enabled: true,
      distributed: false,

      style: {
        fontSize: "10px",
      },
      formatter: function (val, opts) {
        const course = opts?.w?.config?.series[0]?.data?.[opts.dataPointIndex];

        return [course.courseName, course.classTime];
      },
    },
    xaxis: {
      categories: [
        "شنبه",
        "يكشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
      ],
      tickAmount: 13,
      min: new Date(2023, 0, 1, 7, 0).getTime(),
      max: new Date(2023, 0, 1, 20, 0).getTime(),
      labels: {
        formatter: (value) => {
          const date = new Date(value);
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        },
      },
    },

    yaxis: {
      min: new Date(2023, 0, 1, 7, 0).getTime(),
      max: new Date(2023, 0, 1, 19, 0).getTime(),
      type: "datetime",
    },

    tooltip: {
      enabled: false,
      // y: {
      //   formatter: function (value) {
      //     const date = new Date(value);
      //     return date.toLocaleTimeString("en-US", {
      //       hour: "2-digit",
      //       minute: "2-digit",
      //     });
      //   },
      // },
    },

    responsive: [
      {
        breakpoint: 700,
        options: {
          chart: {
            width: 900,
          },
        },
      },
    ],
  };

  const totalUnits = state.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.theoreticaUnits),
    0
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [conflictList, setConflictList] = useState<Course[] | []>([]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <Stack gap={2} p={3} overflow={"hidden"}>
      <AppBar>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={1}
          px={2}
        >
          <Typography variant="h1">ترم ایناس</Typography>

          <Button
            variant="outlined"
            color="inherit"
            size="small"
            endIcon={<Visibility />}
            onClick={() => setOpenModal(true)}
          >
            کد دروس انتخاب شده
          </Button>
        </Stack>
      </AppBar>

      <Stack direction={"row"} justifyContent={"space-between"} mt={10}>
        <Typography variant="h4" marginLeft={"auto"}>
          واحد انتخاب شده:{totalUnits} ‌
        </Typography>
      </Stack>

      <Alert severity="info">
        با کلیک بر روی درس انتخاب شده در نمودار میتوانید آن را پاک کنید.
      </Alert>
      {conflictList.length > 0 && (
        <Alert variant="standard" severity="error">
          <AlertTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            تداخل با دروس زیر{" "}
            <IconButton size="small" onClick={() => setConflictList([])}>
              x
            </IconButton>
          </AlertTitle>

          <Stack>
            {conflictList.map((item) => (
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography variant="body1">{item.courseName}</Typography>
                <Typography variant="caption">{item.classTime}</Typography>
              </Box>
            ))}
          </Stack>
        </Alert>
      )}
      <Grid container direction={"row"} width={"100%"} flexWrap={"wrap"}>
        <Grid
          item
          flexDirection={"column"}
          display={"flex"}
          xs={12}
          md={3}
          sx={{ px: 2, gap: 2 }}
        >
          <Typography variant="h3">لیست دروس ارایه شده</Typography>

          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            fullWidth
            placeholder="جستجو نام کلاس"
          />

          <Divider />
          <List
            dense={true}
            sx={{
              height: {
                xs: 360,
                md: 450,
              },
              overflowY: "scroll",
              width: "100%",
            }}
          >
            {courses
              .filter((course) =>
                course?.courseName
                  ?.toLowerCase()
                  ?.includes(searchTerm?.toLowerCase())
              )
              ?.map((item, index) => (
                <ListItem>
                  <ListItemButton
                    sx={{ display: "flex", gap: 2 }}
                    onClick={() => {
                      const conflicts = state.filter(
                        (existingClass) =>
                          existingClass.x === item.x &&
                          isTimeConflict(item, existingClass)
                      );
                      if (conflicts.length > 0) {
                        setConflictList(conflicts);
                        window.scrollTo({ top: 0 });
                      } else {
                        setState((prv) => [...prv, item]);
                        element.current.scrollIntoView();
                        element.current.scrollBy({
                          top: 100,
                          left: 100,
                          behavior: "smooth",
                        });

                        enqueueSnackbar("درس انتخاب شد", {
                          variant: "success",
                        });
                      }
                    }}
                  >
                    {index + 1}
                    <ListItemText
                      primary={item.courseName}
                      secondary={item.classTime}
                    />
                    <ListItemText secondary={item.teacher} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </Grid>

        <Grid
          item
          component={Paper}
          xs={12}
          md={9}
          sx={{ flexGrow: 1, overflowX: "auto" }}
          ref={element}
          p={1}
          dir="ltr"
        >
          <ReactApexChart
            height={450}
            series={series}
            type="rangeBar"
            options={options}
          />
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle id="alert-dialog-title">لیست دروس انتخاب شده</DialogTitle>
        <DialogContent t sx={{ maxHeight: 300, overflowY: "scroll" }}>
          <List>
            {state.map((item) => (
              <>
                <ListItem>
                  <ListItemText
                    sx={{
                      [`.${listItemTextClasses.primary}`]: {
                        fontSize: 14,
                      },
                      [`.${listItemTextClasses.secondary}`]: {
                        fontSize: 12,
                      },
                    }}
                    primary={item.courseName}
                    secondary={item.courseCode}
                  />
                </ListItem>

                <Divider />
              </>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default CoursesList;

const isTimeConflict = (newClass, existingClass) => {
  const [newStart, newEnd] = newClass.y;
  const [existingStart, existingEnd] = existingClass.y;

  return newStart < existingEnd && newEnd > existingStart;
};
