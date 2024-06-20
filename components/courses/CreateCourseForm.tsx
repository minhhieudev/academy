"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ComboBox } from "../custom/ComboBox"
import { Router } from "lucide-react"
import { useRouter } from "next/router"
import ToasterProvider from "../providers/ToasterProvider"
import toast from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(2, { message: "Title is required and minimum 2 characters" }),
    categoryId: z.string().min(1, { message: "Category is required and minimum 2 characters" }),
    subCategoryId: z.string().min(1, { message: "Category is required and minimum 2 characters" }),
})

interface CreateCourseFormProps {
    categories: {
        label: string, // name category
        value: string, // categories id
        subCategories: { label: string, value: string }[]

    }[]
}

const CreateCourseForm = ({ categories }: CreateCourseFormProps) => {
    const Router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            subCategoryId: "",
        },
    })
    const  onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/instructor/courses', values);
            Router.push(`/instructor/courses/${res.data.id}/basic`)
            toast.success('New courses created ')
            
        } catch (error) {
            console.log("Failed to create new course", error)
            toast.error('Some thing went wrong!')
        }
    }
    return (
        <div className="p-10">
            <h1 className="text-xl font-bold">Let give some basics for your course</h1>
            <p className="text-sm mt-3">It is ok if you cannot think ò a good title or correct category now. You change them latter </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Web developer for beginner" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <ComboBox options={categories} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subCategoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>SubCategory</FormLabel>
                                <FormControl>
                                    <ComboBox options={categories.find((category) =>
                                        category.value === form.watch("categoryId"))?.subCategories || []
                                    }
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCourseForm
