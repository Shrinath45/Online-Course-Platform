import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IHeader from "../Header/iHeader";



const AddCourse = () => {


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/instructor-courses');
  }


  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "ENGLISH",
    courseType: "FREE",
    price: 0,
    thumbnail: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.courseType === "PAID" && Number(form.price) <= 0) {
      alert("Price must be greater than 0 for paid courses");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("language", form.language);
      formData.append("course_type", form.courseType);
      formData.append("price", form.price);
      formData.append("thumbnail", form.thumbnail);
      formData.append("video", form.video);

      const res = await axios.post(
        "/instructor/add-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data?.success) {
        toast.success("Course Uploaded Successfully..");
        navigate("/instructor-courses");

        // ✅ delay closing modal slightly
        setTimeout(() => {
          onClose();
        }, 300);
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload course");
    }
  };



  return (
    <>
    <IHeader />
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#111] border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-25 right-4 w-fit px-6 py-2 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>
        {/* Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Upload New Course
        </h2>

        {/* Course Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter course title"
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Short course description"
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Grid: Language & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Language
            </label>
            <select
              name="language"
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ENGLISH">English</option>
              <option value="HINDI">Hindi</option>
              <option value="MARATHI">Marathi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Type
            </label>
            <select
              name="courseType"
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
        </div>

        {/* Price */}
        {form.courseType === "PAID" && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Price (₹)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter course price"
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        {/* Thumbnail */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Thumbnail Image
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-[#1a1a1a] border border-dashed border-gray-700 px-4 py-3 text-gray-400 file:text-sm file:bg-emerald-500 file:text-black file:border-none file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
          />
        </div>

        {/* Video */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Video
          </label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-[#1a1a1a] border border-dashed border-gray-700 px-4 py-3 text-gray-400 file:text-sm file:bg-emerald-500 file:text-black file:border-none file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-lg transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Course"}
        </button>

      </form>
    </div>
    </>
  );
};

export default AddCourse;
