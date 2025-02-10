"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import Select from "react-tailwindcss-select";
// import { useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useForm } from "react-hook-form";
import TextInput from "./textinput";
import ImageInput from "./imageupload";
import { CategoryType } from "@/Types/types";
import { useState } from "react";
import SubmitButton from "./submitbutton";

export default function CategoryForm() {
  const initialImage = "/PlaceHolder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryType>({
    // defaultValues: {
    //   title: initialData?.title,
    //   description: initialData?.description || "",
    // },
  });
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  
  // const initialImage = initialData?.imageUrl || "/placeholder.svg";
  // const [imageUrl, setImageUrl] = useState(initialImage);
  // const initialStatus = {
  // value: initialData?.status == true ? "true" : "false",
  // label: initialData?.status == true ? "Active" : "Disabled",
  // };
  // const [status, setStatus] = useState<any>(initialStatus);
  // const options: Options = [
  // { value: "true", label: "Active" },
  // { value: "false", label: "Disabled" },
  // ];
  // const handleChange = (item: SelectValue) => {
  // console.log("value:", item);
  // setStatus(item);
  // };
  // async function saveCategory(data: CategoryProps) {
  // try {
  //   setLoading(true);
  //   data.slug = generateSlug(data.title);
  //   data.status = status && status.value == "true" ? true : false;
  //   data.imageUrl = imageUrl;
  //   data.mainCategoryId = selectedMainCategory.value;

  //   if (editingId) {
  //     await updateCategoryById(editingId, data);
  //     setLoading(false);
  //     // Toast
  //     toast.success("Updated Successfully!");
  //     //reset
  //     reset();
  //     //route
  //     router.push("/dashboard/inventory/categories");
  //     setImageUrl("/placeholder.svg");
  //   } else {
  //     await createCategory(data);
  //     setLoading(false);
  //     // Toast
  //     toast.success("Successfully Created!");
  //     //reset
  //     reset();
  //     setImageUrl("/placeholder.svg");
  //     //route
  //     // router.push("/dashboard/inventory/categories");
  //   }
  // } catch (error) {
  //   setLoading(false);
  //   console.log(error);
  // }
  async function Submit(data: CategoryType) {
    data.categorySlug = data.categoryTitle.split(" ").join("-").toLowerCase();
    data.categoryIcon = imageUrl;
    // console.log(data)
    try {
        setLoading(true)
      await fetch(`${baseUrl}/api/v1/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // console.log(response);
      setLoading(false)
      reset();
    } catch (error) {
        setLoading(false)
      console.log(error);
    }
  }

  // }
  // async function handleDeleteAll() {
  // setLoading(true);
  // try {
  // await deleteManyCategories();
  // setLoading(false);
  // } catch (error) {
  // console.log(error);
  // }
  // }
  // console.log(status);

  return (
    <form className="" onSubmit={handleSubmit(Submit)}>
      <div className="max-w-4xl">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Category Form</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <ImageInput
                  title="Category Icon Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="imageUploader"
                />
              </div>
            </CardContent>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Category Title"
                    name="categoryTitle"
                  />
                </div>
              </div>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-3">
                        <SubmitButton
                            title="Submit"
                            // title={editingId ? `Update ${title}` : `Save ${title}`}
                            loading={loading}
                        />
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
