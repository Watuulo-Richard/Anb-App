/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Tv, Coffee, Bath, Car, UtensilsCrossed, Waves, Wind, Loader } from "lucide-react"
import { useFormStore } from "@/store/useFormStore"
import { ProgressSteps } from "./step"
import FormSelectInput from "../formselect"
import { Category, Product } from "@prisma/client"
import MultipleImageInput from "./multipleimageupload"
import TextInput from "../textinput"
import { useForm } from "react-hook-form"
import { ListingFormData } from "@/Types/types"
import TextArea from "../textarea"
import JackalToaster from "./toast"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function ListingForm({receivedCategoriesFromFetch, receivedSingleProductFromFetch}:{receivedCategoriesFromFetch?:Category[], receivedSingleProductFromFetch?:Product | null}) {
  console.log(receivedCategoriesFromFetch?.length);
    const initialImages = receivedSingleProductFromFetch?.images || [
        "/Image-Upload.svg",
        "/Image-Upload-Two.svg",
        "/Image-Upload-Three.jpg",
        ];
    const [productImages, setProductImages] = useState(initialImages);
    const [selectedMainCategory, setSelectedMainCategory] = useState<any>("");
    const fetchedCategories = receivedCategoriesFromFetch?.map((category)=>({
        value:category.id,
        label: category.categoryTitle
    }))

  const { step, formData, setStep, updateFormData, resetForm  } = useFormStore()
  console.log(formData)
  const [loading, setLoading] = useState(false);
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [resetForm])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }
  useEffect(() => {
    if (receivedSingleProductFromFetch) {
      // Update Zustand store with the received product data
      updateFormData({
        title: receivedSingleProductFromFetch.title,
        location: receivedSingleProductFromFetch.location,
        description: receivedSingleProductFromFetch.description,
        price: receivedSingleProductFromFetch.price,
        maxGuests: receivedSingleProductFromFetch.maxGuests,
        availability: [new Date(receivedSingleProductFromFetch.availability)],
        amenities: receivedSingleProductFromFetch?.amenities 
        ? Object.fromEntries(
            Object.entries(receivedSingleProductFromFetch.amenities).map(([key, value]) => [
              key, typeof value === 'boolean' ? value : false, 
            ])
          ) 
        : {},
              images: receivedSingleProductFromFetch.images,
      });
    }
  }, [receivedSingleProductFromFetch, updateFormData]);
  const { register, handleSubmit, formState: { errors } } = useForm<ListingFormData>({
    defaultValues: {
      title: receivedSingleProductFromFetch?.title,
      location: receivedSingleProductFromFetch?.location,
      description: receivedSingleProductFromFetch?.description,
      price: receivedSingleProductFromFetch?.price,
      maxGuests: receivedSingleProductFromFetch?.maxGuests,   
      availability: receivedSingleProductFromFetch?.availability, 
  
    }
  });
  
  async function onSubmit(data:ListingFormData){
    data.images = productImages
    data.amenities = Object.keys(formData.amenities).reduce<{ [key: string]: boolean }>((acc, key) => {
      acc[key] = formData.amenities[key] === true;
      return acc;
    }, {});
    
    data.availability = formData.availability[0]
    data.categoryId = selectedMainCategory.value
    data.price = Number(data.price)
    data.maxGuests = formData.maxGuests
    data.slug = data.title.split(" ").join("-").toLowerCase() 
    // console.log(data , "this is my data");
    try {
        // setLoading(true)
        const response = await fetch(`${baseUrl}/api/v1/products`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        if (response) {
          setLoading(true)
          JackalToaster({
            title:"Product Created",
            description:"Hahahahahahaha........!!!",
            image:"/avatar-richard.png"
          })
          setLoading(false)
      }       
     } catch (error) {
      setLoading(false)
      console.log(error);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ProgressSteps />
        <motion.div initial="initial" animate="animate" exit="exit" variants={fadeIn} transition={{ duration: 0.5 }}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">List Your Space</CardTitle>
              <CardDescription className="text-center">Step {step} of 4</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2"> 
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Product Name"
                            name="title"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="grid gap-3 pt-3">
                            <TextInput
                            register={register}
                            errors={errors}
                            label="Location"
                            name="location"
                            placeholder="e.g. Levallois-Perret, France"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <TextArea
                            register={register}
                            errors={errors}
                            label="Product Description"
                            name="description"
                        />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
  {[
    { icon: Wifi, label: "Wifi" },
    { icon: Tv, label: "TV" },
    { icon: Coffee, label: "Coffee Maker" },
    { icon: Bath, label: "Private Bath" },
    { icon: Car, label: "Parking" },
    { icon: UtensilsCrossed, label: "Kitchen" },
    { icon: Waves, label: "Air Conditioning" },
    { icon: Wind, label: "Heating" },
  ].map((amenity, index) => (
    <div
      key={index}
      className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Switch
        id={`amenity-${index}`}
        checked={formData.amenities[amenity.label] || false}
        onCheckedChange={(checked) => {
          updateFormData({
            amenities: {
              ...formData.amenities,
              [amenity.label]: checked,
            },
          })
        }}
      />
      <Label htmlFor={`amenity-${index}`} className="flex items-center gap-2">
        <amenity.icon className="w-4 h-4" />
        {amenity.label}
      </Label>
    </div>
  ))}
</div>

                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                        {/* Image Upload */}
                        <div className="">
                            <MultipleImageInput
                                title="Product Images"
                                imageUrls={productImages}
                                setImageUrls={setProductImages}
                                endpoint="imageUploader"
                            />
                        </div>

                      <div className="">
                        <Card>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                                    <FormSelectInput
                                        label="Main Categories"
                                        options={fetchedCategories}
                                        option={selectedMainCategory}
                                        setOption={setSelectedMainCategory}
                                        toolTipText="Add New Main Category"
                                        href="/dashboard/categoryform"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"> 
                            <TextInput
                                type="number"
                                register={register}
                                errors={errors}
                                label="Price per night"
                                name="price"
                                placeholder="$"
                            />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guests">Max guests</Label>
                          <Select
                            value={String(formData.maxGuests)}
                            onValueChange={(value) => updateFormData({ maxGuests: Number(value) })}
                          >
                            <SelectTrigger id="guests">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num} {num === 1 ? "guest" : "guests"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Availability</Label>
                        <Calendar
                          mode="multiple"
                          selected={formData.availability}
                          onSelect={(dates) => updateFormData({ availability: dates || [] })}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                  Previous
                </Button>

                {
                    loading?(
                        <Button>
                          <Loader/>
                      </Button>
                    ):(
                      <Button 
                      type={step === 4 ? "submit" : "button"} // Only make it a submit button on step 4
                      onClick={() => {
                        if (step === 4) {
                          handleSubmit(onSubmit)(); // Submit the form when on step 4
                        } else {
                          setStep(step + 1); // Otherwise, move to the next step
                        }
                      }}
                    >
                      {step === 4 ? "Submit" : "Next"} {/* Show 'Submit' on step 4, otherwise 'Next' */}
                    </Button>
                     
                    )
                }
              </div>
            </CardContent>
          </Card>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

