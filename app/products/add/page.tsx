"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { uploadProduct } from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      event.target.value = "";
      return;
    }
    // Check file size (max 3MB)
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxSize) {
      alert("File is too large. Maximum size is 3MB.");
      event.target.value = "";
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={uploadProduct} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-cover bg-center text-neutral-300"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-sm text-neutral-400">
                Please upload photos here.
              </div>
            </>
          )}
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
