import { ListItem, List as MuiList } from "@mui/material";
import { data } from "./data";

export const List = () => {
  return (
    <MuiList sx={{ height: 400 , overflowY:'auto'}}>
      {data.map((item) => (
        <ListItem>{item.courseName}</ListItem>
      ))}
    </MuiList>
  );
};
