"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QueryKeys } from '@/constants/QueryKeys'
import { BasicTable } from '@/features/common/BasicTable'
import { CommonDialog } from '@/features/common/Dialog'
import { deleteApi, getAPi, patchProductApi, postApi } from '@/http/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Pencil, Trash2, UploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import * as yup from "yup"

const CoursesTeacherList = () => {
    const [openAddCoursesTeacherDialog, setOpenAddCoursesTeacherDialog] = useState<boolean>(false)
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
    const [editTeacher, setEditTeacher] = useState<any>(null)

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: QueryKeys.courses.coursesTeacher,
        queryFn: async () => {
            return getAPi("/courses/courses-teacher")
        }
    })

    const {
        mutate: createCoursesTeacher,
        isPending,
        isError: createIsErr,
        error: createErr
    } = useMutation({
        mutationKey: QueryKeys.courses.createCoursesTeacher,
        mutationFn: async (data: any) => postApi("/courses/create/courses-teacher", data),
        onSuccess: () => {
            formik.resetForm()
            refetch()
            setOpenAddCoursesTeacherDialog(false)
        },
        onError: () => {
            console.log(createErr)
        }
    })

    const {
        mutate: deleteCoursesTeacher,
        isPending: deletePending,
    } = useMutation({

        mutationFn: async (id: string) => await deleteApi(`/courses/courses-teacher/${id}`),
        onSuccess: () => {
            refetch();
        },
    });

    const {
        mutate: updateTeacher,
        isPending: updatePending,
    } = useMutation({
        mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
            return patchProductApi(`/courses/courses-teacher/${id}`, formData);
        },
        onSuccess: () => {
            formik.resetForm();
            refetch();
            setOpenEditDialog(false);
            setEditTeacher(null);
        },
    });

    const columns = [
        "Image",
        "Name",
        "Specialty",
        "Actions"
    ]

    const rows = data && data?.data?.map((item: any) => {
        return {
            id: item?._id,
            Name: item?.name,
            Specialty: item?.specialty,
            Image: (
                <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-12 h-12 object-cover rounded-md"
                />
            ),
            Actions: (
                <div className='flex items-center gap-1.5'>
                    <Button
                        className="bg-blue-500 text-white hover:text-white p-1.5 px-2.5 rounded-md hover:bg-blue-600"
                        variant="outline"
                        onClick={() => handleEditClick(item)}
                    >
                        <Pencil />
                    </Button>
                    <Button
                        className="bg-red-500 text-white p-1.5 px-2.5 rounded-md hover:bg-red-600 hover:text-white duration-300"
                        variant="outline"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this product?")) {
                                deleteCoursesTeacher(item?._id);
                            }
                        }}
                    >
                        <Trash2 />
                    </Button>
                </div>
            )
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editTeacher ? editTeacher.name : "",
            specialty: editTeacher ? editTeacher.specialty : "",
            imageUrl: editTeacher ? editTeacher?.imageUrl : "" as string | File,
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            specialty: yup.string().required("Specialty is required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("specialty", values.specialty);
            if (values.imageUrl && typeof values.imageUrl !== "string") {
                formData.append("file", values.imageUrl);
            }
            if (editTeacher) {
                updateTeacher({ id: editTeacher._id, formData });
            } else {
                createCoursesTeacher(formData);
            }
        },
    });

    const handleEditClick = (teacher: any) => {
        setEditTeacher(teacher);
        setOpenEditDialog(true);
    };

    return (
        <div>
            <div className='flex items-center my-5 justify-between'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    Courses Teacher Lists
                </h1>
                <Button
                    onClick={() => {
                        setOpenAddCoursesTeacherDialog(true);
                        setEditTeacher(null);
                        formik.resetForm();
                    }}
                    className='bg-green-500 text-[14px] text-white px-4 py-2 rounded-md hover:bg-green-600 hover:text-white duration-300'
                >
                    Add Teacher
                </Button>
            </div>

            <BasicTable cols={columns} rows={rows} isLoading={isLoading} />

            {
                (openAddCoursesTeacherDialog || openEditDialog) && (
                    <CommonDialog
                        open={openAddCoursesTeacherDialog || openEditDialog}
                        onClose={() => {
                            setOpenAddCoursesTeacherDialog(false);
                            setOpenEditDialog(false);
                            setEditTeacher(null);
                            formik.resetForm();
                        }}
                        title={openEditDialog ? 'Edit Courses Teacher' : 'Add Courses Teacher'}
                        desc='Fill the form below to add a new courses teacher.'
                    >
                        <form onSubmit={(e: any) => {
                            e.preventDefault()
                            formik.handleSubmit()
                        }}>
                            {createIsErr && (
                                <div className='bg-red-100 text-red-500 rounded-2xl p-4'>
                                    {createErr?.message}
                                </div>
                            )}

                            <div className='flex gap-4'>
                                <div>
                                    <Label className='mb-2' htmlFor='name'>Teacher Name</Label>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        name='name'
                                        type='text'
                                        placeholder='Enter teacher name'
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div>
                                    <Label className='mb-2' htmlFor='specialty'>Teacher Specialty</Label>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={formik.values.specialty}
                                        name='specialty'
                                        type='text'
                                        placeholder='Enter teacher specialty'
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            {
                                formik.touched.name && formik.errors.name && (
                                    <div className='text-sm mt-1 font-medium text-red-500'>
                                        {typeof formik.errors.name === "string"
                                            ? formik.errors.name
                                            : Array.isArray(formik.errors.name)
                                                ? formik.errors.name.join(", ")
                                                : null}
                                    </div>
                                )
                            }
                            {
                                formik.touched.specialty && formik.errors.specialty && (
                                    <div className='text-sm mt-1 font-medium text-red-500'>
                                        {typeof formik.errors.specialty === "string"
                                            ? formik.errors.specialty
                                            : Array.isArray(formik.errors.specialty)
                                                ? formik.errors.specialty.join(", ")
                                                : null}
                                    </div>
                                )
                            }
                            <div>
                                <div className="flex items-center justify-center w-full mt-5">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadIcon className="w-10 h-10 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
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

                                {/* Upload olunan faylın adı və ölçüsü */}
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
                                className='my-4 py-3 rounded-md w-full'
                                type='submit'
                            >
                                {openEditDialog
                                    ? (updatePending
                                        ? 'Updating...'
                                        : 'Update Teacher')
                                    : (isPending
                                        ? 'Adding...' :
                                        'Add Teacher')}
                            </Button>
                        </form>
                    </CommonDialog>
                )
            }
        </div>
    )
}

export default CoursesTeacherList;
