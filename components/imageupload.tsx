/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
type ImageInputProps = {
title: string;
imageUrl: string;
setImageUrl: any;
endpoint: any;
};
export default function ImageInput({
title,
imageUrl,
setImageUrl,
endpoint,
}: ImageInputProps) {
return (
<Card className="overflow-hidden">
  <CardHeader>
    <CardTitle className="text-xl font-semibold flex items-center justify-center">
      {title}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Card className="grid gap-2 px-2">
      <Image
        alt={title}
        className="h-60 w-full object-contain"
        height="300"
        src={imageUrl}
        width="300"
      />
      <UploadButton
        className="ut-button:bg-gray-950 ut-button:w-full"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
 
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </Card>
  </CardContent>
</Card>
 
);
}
 