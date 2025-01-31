"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import TextInput from "./text-input";
import SubmitButton from "./submit-button";
import CustomCarousel from "./custom-corousel";
import MultipleImageInput from "./image-input";
import toast from "react-hot-toast";
export type productInputProps = {
  productName: string;
  Description: string;
  Quantity: number;
  price: number;
  Comment: string;
  images:string[]
};
export default function RegisterProduct() {
  const initialImages = [
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    ];
    const [productImages, setProductImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<productInputProps>();
  // const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  async function onSubmit(data: productInputProps) {
    data.images = productImages
    data.Quantity = Number(data.Quantity)
    data.price = Number(data.price)
    
    try {
      setIsLoading(true)
      const product = await fetch(`${baseUrl}/api/v1/products`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      })
      toast.success("created successfully")
      setIsLoading(false)
      console.log(product)
      
    } catch (error) {
      setIsLoading(false)
      toast.success("created successfully")
      console.log(error)
    }
    reset()
    
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative">
      <div className="flex items-center justify-center py-12 overflow-y-scroll scrollbar-hidden">
        <div className="mx-auto grid w-[350px] gap-6 pt-96">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create a Product</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Product Name"
              register={register}
              name="productName"
              errors={errors}
              placeholder="Enter product Name"
            />
            <TextInput
              label="Description"
              register={register}
              name="Description"
              type="text"
              errors={errors}
              placeholder="Enter product description"
              toolTipText="E.g product description"
            />
            <TextInput
              label="Quantity"
              register={register}
              name="Quantity"
              type="number"
              errors={errors}
              placeholder="E.g 2"
            />
            <TextInput
              label="Price"
              register={register}
              name="price"
              type="number"
              errors={errors}
              placeholder="E.g 5"
            />
            <TextInput
              label="Comment"
              register={register}
              name="Comment"
              type="text"
              errors={errors}
              placeholder="Enter Comment"
              toolTipText="comment about the product"
            />
            <MultipleImageInput 
            title="Product Images"
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="imageUploader"
            />

            <SubmitButton
              title="Sign Up"
              loading={isLoading}
              loadingTitle="Creating Account please wait..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
