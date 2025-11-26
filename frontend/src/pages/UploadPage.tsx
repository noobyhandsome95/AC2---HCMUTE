import { UploadForm } from "../forms/UploadForm"

export const UploadPage = () => {
  return (
    <>
      <div className="relative pt-14 min-h-screen h-auto w-full gradient-pattern">
        <div className="w-full flex justify-center">
          <UploadForm />
        </div>
      </div>
    </>
  )
}
