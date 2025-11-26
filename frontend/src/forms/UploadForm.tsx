import { useState } from "react"
import { BoxInputBase } from "../components/sub/BoxInputBase"
import { ThumbnailUpload } from "../components/sub/ThumbnailUpload";
import { TiptapEditor } from "../components/editor/TiptapEditor";
import { ButtonBase } from "../components/sub/ButtonBase";

export const UploadForm = () => {

  const [content, setContent] = useState<string>("");

  return (
    <div className="w-full md:w-4/5 px-8 pt-1 pb-6 mt-2 mb-8 bg-black/60 flex flex-col rounded-lg">

      {/* Heading */}
      <h1 className="text-3xl">Create new post</h1>
      <div className="w-full my-2 py-1 px-3 bg-yellow-500/20 text-yellow-500 border-[1px] border-yellow-500 font-light rounded-lg">
        Please read the
        <a href="" className="text-blue-300 px-1 hover:text-blue-700">
          guidelines
        </a> 
        before uploading.
      </div>

      {/* Form */}
      <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="md:col-span-1 h-full">
            <span className="text-white text-sm font-semibold mb-1 block pl-1">Thumbnail</span>
             <div className="h-[180px] lg:h-[calc(100%-1.75rem)]">
                <ThumbnailUpload />
             </div>
          </div>
          <div className="mt-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            <BoxInputBase
              type="text"
              width="w-full"
              nameHolder=""
              placeholder="Enter the title here"
              subClassname="md:col-span-2"
            />
            <BoxInputBase
              type="text"
              width="w-full"
              nameHolder=""
              placeholder="Topic eg: Frontend, Backend"
            />
            <BoxInputBase
              type="text"
              width="w-full"
              nameHolder=""
              placeholder="Time to read eg: 5 minutes"
            />
            <div className="md:col-span-2 flex flex-col justify-start space-y-1">
                <span className="text-white text-sm font-semibold pl-1"></span>
                <textarea 
                    className="block bg-black/70 w-full text-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none sm:text-sm placeholder:italic placeholder:text-white resize-none transition-colors"
                    placeholder="Short Description / Subscription (Max 2 lines)"
                    rows={1}
                />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex flex-col space-y-1">
          <span className="text-white text-sm font-semibold pl-1">Content</span>
          <TiptapEditor 
            content={content} 
            onChange={(html) => setContent(html)} 
          />
        </div>

        <div className="w-full flex flex-row items-center justify-end space-x-4">
          <ButtonBase
              type="submit" 
              width="w-28"
              name="Cancel"
              textColor="text-white"
              bgColor="bg-secondary"
              subClassName="hover:bg-accent/20"
          />
          <ButtonBase
              type="submit" 
              width="w-28"
              name="Publish"
              textColor="text-white"
              bgColor="bg-secondary"
              subClassName="hover:bg-accent/20"
          />
        </div>
      </form>
    </div>
  )
}
