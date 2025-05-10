"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = () => {};
  return (
    <div>
      <form className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 text-neutral-300"
        >
          <PhotoIcon className="w-20" />
          <div className="text-sm text-neutral-400">
            Please upload photos here.
          </div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input name="title" required placeholder="Title" type="text" />
        <Input name="price" required placeholder="Price" type="number" />
        <Input
          name="description"
          required
          placeholder="Product description"
          type="text"
        />
        <Button text="Submit" />
      </form>
    </div>
  );
}
