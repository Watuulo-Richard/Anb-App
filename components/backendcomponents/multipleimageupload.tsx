/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
type ImageInputProps = {
title: string;
imageUrls: string[];
setImageUrls: any;
endpoint: any;
};
export default function MultipleImageInput({
title,
imageUrls,
setImageUrls,
endpoint,
}: ImageInputProps) {
// console.log(imageUrls);
return (
<Card className="overflow-hidden">
  <CardHeader className="flex items-center justify-center">
    <CardTitle>{title}<hr /></CardTitle>
    
  </CardHeader>
  <CardContent>
    <div className="grid gap-2">
      <Card>
        <Image
            alt={title}
            className="h-40 w-full rounded-md object-cover"
            height="300"
            src={imageUrls[0]}
            width="300"
        />
      </Card>
      <div className="grid grid-cols-3 gap-2">
        {imageUrls.map((imageUrl: string, i: number) => {
          return (
            <Card key={i}>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={imageUrl}
                width="84"
              />
            </Card>
          );
        })}
      </div>
      <UploadButton
        className="col-span-full"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          // console.log(
          //   "Files: ",
          //   res.map((item) => item.url)
          // );
          setImageUrls(res.map((item) => item.url));
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  </CardContent>
</Card>
);
}
 