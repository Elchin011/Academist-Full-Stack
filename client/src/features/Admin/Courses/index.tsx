"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryKeys } from "@/constants/QueryKeys";
import { BasicTable } from "@/features/common/BasicTable";
import { CommonDialog } from "@/features/common/Dialog";
import { deleteApi, getAPi, patchProductApi, postApi } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Pencil, Trash2, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import * as yup from "yup";

const CoursesList = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const [editCourse, setEditCourse] = useState<any>(null);



  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: QueryKeys.courses.All,
    queryFn: async () => {
      return getAPi("/courses");
    },
  });

  const {
    data: coursesTeachers,
    isLoading: coursesTeachersLoading,
  } = useQuery({
    queryKey: QueryKeys.courses.coursesTeacher,
    queryFn: async () => {
      return getAPi("/courses/courses-teacher");
    },
  });

  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: QueryKeys.courses.createCourse,
    mutationFn: async (data: any) => postApi("/courses/create", data),
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddDialog(false);
    },
    onError: () => {
      console.log(createErr);
    },
  });

  const {
    mutate: deleteServiceLevels,
    isPending: deletePending,
  } = useMutation({

    mutationFn: async (id: string) => await deleteApi(`/courses/${id}`),
    onSuccess: () => {
      refetch();
    },
  });

  const {
    mutate: updateCourses,
    isPending: updatePending,
  } = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      return patchProductApi(`/courses/${id}`, formData);
    },
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddDialog(false);
      setEditCourse(null);
    },
  });



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editCourse ? editCourse.name : "",
      price: editCourse ? editCourse.price : 0,
      teacher: editCourse ? editCourse.teacher : "",
      imageUrl: editCourse ? editCourse.imageUrl : "" as string | File,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      price: yup.number().required("Price is required").min(0, "Price must be a positive number"),
      teacher: yup.string().required("Teacher is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("teacher", values.teacher);
      if (values.imageUrl && typeof values.imageUrl !== "string") {
        formData.append("file", values.imageUrl);
      }
      formData.append("price", values.price.toString());
      if (editCourse) {
        updateCourses({ id: editCourse._id, formData });
      } else {
        mutate(formData);
      }
    },
  });


  const handleEditClick = (courses: any) => {
    setEditCourse(courses);
    setOpenAddDialog(true);
  };



  const columns = ["Id", "Name", "Price", "Teacher", "Image", "Actions"];

  const rows =
    data &&
    data?.data?.map((item: any) => {
      return {
        Id: item?._id,
        Name: item?.name,
        Price: item?.price,
        Teacher: item?.teacher?.name ?? "-",
        Image: (
          <div>
            <img
              src={item?.imageUrl}
              alt={item?.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          </div>
        ),
        Actions: (
          <div className="flex items-center gap-2">
            <Button
              className="bg-blue-500 text-[14px] text-white p-1.5 px-2.5 rounded-md hover:bg-blue-600 hover:text-white duration-300"
              variant="outline"
              onClick={() => {
                handleEditClick(item);
              }}
            >
              <Pencil />
            </Button>
            <Button
              className="bg-red-500 text-[14px] text-white p-1.5 px-2.5 rounded-md hover:bg-red-600 hover:text-white duration-300"
              variant="outline"
              onClick={() => {
                if (confirm("Are you sure you want to delete this course?")) {
                  deleteServiceLevels(item?._id);
                }
              }}
            >
              <Trash2 />
            </Button>
          </div>
        ),
      };
    });




  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <div className='relative'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Courses Lists
          </h1>
          <span className='h-[2px] w-full bg-red-500 absolute bottom-0.5'>

          </span>
        </div>
        <Button
          className="bg-green-500 text-white px-4 py-2  rounded-md hover:bg-green-600 hover:text-white duration-300"
          onClick={() => {
            setOpenAddDialog(true);
            setEditCourse(null);
            formik.resetForm();
          }}
        >
          Add Course
        </Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />
      {(openAddDialog || openEditDialog) && (
        <CommonDialog
          open={openAddDialog || openEditDialog}
          onClose={() => {
            setOpenAddDialog(false);
            setOpenEditDialog(false);
            setEditCourse(null);
            formik.resetForm();
          }}
          title={openEditDialog ? "Edit Course" : "Add Course"}
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {createIsErr && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4">
                {createErr?.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2" htmlFor="name">
                  {" "}
                  Name
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                  type="text"
                  placeholder="Enter the Product Name."
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="person">
                  {" "}
                  Select Teacher
                </Label>
                <Select
                  name="teacher"
                  value={formik.values.teacher}
                  onValueChange={(value) => {
                    formik.setFieldValue("teacher", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {coursesTeachers &&
                        coursesTeachers?.data?.map((coursesTeacher: any) => (
                          <SelectItem key={coursesTeacher?._id} value={coursesTeacher?._id}>
                            {coursesTeacher?.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.touched.teacher && typeof formik.errors.teacher === "string" && (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.teacher}
                  </div>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="price">
                  {" "}
                  Price
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  name="price"
                  type="number"
                  placeholder="Enter the Price"
                  onBlur={formik.handleBlur}
                />

              </div>
            </div>
            <div>
              <div className="flex items-center justify-center w-full mt-5">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("imageUrl", file);
                      }
                    }}
                  />
                </label>
              </div>
              {formik.values.imageUrl && (
                typeof formik.values.imageUrl === "string" ? (
                  <img src={formik.values.imageUrl} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded-md" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{formik.values.imageUrl.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(formik.values.imageUrl.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            <Button
              disabled={isPending || updatePending}
              className="my-4 py-4 rounded-md w-full"
              type="submit"
            >
              {editCourse
                ? updatePending
                  ? "Updating..."
                  : "Update"
                : isPending
                  ? "Creating..."
                  : "Create"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default CoursesList;
