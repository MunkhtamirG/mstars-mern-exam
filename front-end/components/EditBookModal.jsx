import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function EditBookModal({
  openEditBook,
  handleCloseEditBook,
  book,
}) {
  const [value, setValue] = React.useState(dayjs("2022-09-20T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(`https://ozy.ilearn.mn/v1/books/?id=${book?._id}`, {
        book_name: e.target.book_name.value,
        code: e.target.code.value,
        price: e.target.price.value,
        author: e.target.author.value,
        ISBN: e.target.ISBN.value,
        publisher: e.target.publisher.value,
        publish_date: value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          handleCloseEditBook(true);
          location.reload();
        }
      });
  }
  return (
    <div>
      <Modal
        open={openEditBook}
        onClose={handleCloseEditBook}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="add-modal"
      >
        <Box sx={style} component="form" onSubmit={submitHandler}>
          <Typography
            id="modal-modal-title"
            component="h2"
            style={{ fontSize: "24px", fontWeight: 700, textAlign: "center" }}
          >
            Edit Book
          </Typography>
          <TextField
            label="Name"
            name="book_name"
            required
            defaultValue={book?.book_name}
          ></TextField>
          <TextField
            label="Code"
            name="code"
            required
            defaultValue={book?.code}
          ></TextField>
          <TextField
            label="Price"
            name="price"
            required
            defaultValue={book?.price}
          ></TextField>
          <TextField
            label="Author"
            name="author"
            required
            defaultValue={book?.author}
          ></TextField>
          <TextField
            label="ISBN"
            name="ISBN"
            required
            defaultValue={book?.ISBN}
          ></TextField>
          <TextField
            label="Publisher"
            name="publisher"
            required
            defaultValue={book?.publisher}
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack>
              <DateTimePicker
                label="Published on"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                components={{
                  OpenPickerIcon: DateRangeIcon,
                }}
              />
            </Stack>
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
