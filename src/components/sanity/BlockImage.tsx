import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Text from "@components/atoms/Text";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";

type BlockImageProps = {
  src: string;
  alt: string;
  caption?: string;
  showDialog?: boolean;
};

function BlockImage({ src, alt, caption, showDialog = true }: BlockImageProps) {
  return (
    <Dialog>
      <div className="bg-brandaccent-50/50 mx-auto my-8 h-auto max-h-[70vh] w-auto max-w-3xl overflow-hidden bg-gray-100 shadow-sm md:rounded-lg">
        <DialogTrigger className="h-full w-full p-0">
          <Image
            src={src}
            width={500}
            height={500}
            alt={alt ?? ""}
            className="h-[50vh] w-full object-cover"
          />
        </DialogTrigger>
        {showDialog && (
          <DialogContent className="min-h-96 max-w-screen-xl">
            <Image
              width={500}
              height={300}
              src={src}
              alt={alt ?? ""}
              className="h-fit w-full object-contain md:rounded-t-lg"
            />
          </DialogContent>
        )}
        <Text className="bg-brandaccent-50 flex w-full items-center gap-2 p-2 px-5 text-sm italic text-gray-500 md:px-2">
          <ImageIcon size={16} />
          {caption ?? ""} hello there
        </Text>
      </div>
    </Dialog>
  );
}

export default BlockImage;
