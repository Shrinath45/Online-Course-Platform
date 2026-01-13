import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const EditCourse = ({ course, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: course.title,
      language: course.language,
      price: course.price,
      description: course.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`/instructor/update-course/${course.id}`, values);
        toast.success("Course updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update course");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField fullWidth label="Title" {...formik.getFieldProps("title")} />
      <TextField fullWidth label="Language" {...formik.getFieldProps("language")} sx={{ mt: 2 }} />
      <TextField fullWidth label="Price" {...formik.getFieldProps("price")} sx={{ mt: 2 }} />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        {...formik.getFieldProps("description")}
        sx={{ mt: 2 }}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </form>
  );
};

export default EditCourse;
