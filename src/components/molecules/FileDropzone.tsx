'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Upload, X, FileIcon, Loader2 } from 'lucide-react'
import * as React from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'

interface FileWithPreview extends File {
   preview?: string
}

interface FileDropzoneProps extends Omit<DropzoneOptions, 'onDrop'> {
   onFilesSelected?: (files: File[]) => void
   onFilesRemoved?: (file: File) => void
   className?: string
   showPreview?: boolean
   maxFiles?: number
   isUploading?: boolean
}

export default function FileDropzone({ onFilesSelected, onFilesRemoved, className, showPreview = true, maxFiles = 1, isUploading = false, accept, ...dropzoneOptions }: FileDropzoneProps) {
   const [files, setFiles] = React.useState<FileWithPreview[]>([])

   const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
         const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
               preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            }),
         )

         setFiles((prev) => {
            const combined = maxFiles === 1 ? newFiles : [...prev, ...newFiles]
            const limited = combined.slice(0, maxFiles)
            return limited
         })

         onFilesSelected?.(newFiles)
      },
      [maxFiles, onFilesSelected],
   )

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept,
      maxFiles,
      disabled: isUploading,
      ...dropzoneOptions,
   })

   const removeFile = (file: FileWithPreview) => {
      setFiles((prev) => prev.filter((f) => f !== file))
      if (file.preview) {
         URL.revokeObjectURL(file.preview)
      }
      onFilesRemoved?.(file)
   }

   React.useEffect(() => {
      return () => {
         files.forEach((file) => {
            if (file.preview) {
               URL.revokeObjectURL(file.preview)
            }
         })
      }
   }, [files])

   const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
   }

   return (
      <div className={cn('space-y-4', className)}>
         <div
            {...getRootProps()}
            className={cn(
               'bg-background relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
               isDragActive && 'border-primary bg-primary/5',
               !isDragActive && 'border-muted-foreground/25 hover:border-muted-foreground/50',
               isUploading && 'pointer-events-none opacity-60',
            )}>
            <input {...getInputProps()} />
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
               {isUploading ? (
                  <Loader2 className="text-muted-foreground mb-4 h-10 w-10 animate-spin" />
               ) : (
                  <div className="bg-muted mb-4 rounded-full p-3">
                     <Upload className="text-muted-foreground h-6 w-6" />
                  </div>
               )}
               <div className="text-sm">
                  <p className="text-foreground font-medium">
                     {isDragActive ? (
                        'Drop the files here'
                     ) : (
                        <>
                           <span className="text-primary">Click to upload</span> or drag and drop
                        </>
                     )}
                  </p>
                  {accept && <p className="text-muted-foreground mt-1 text-xs">{Object.values(accept).flat().join(', ')}</p>}
                  {maxFiles > 1 && <p className="text-muted-foreground mt-1 text-xs">Maximum {maxFiles} files</p>}
               </div>
            </div>
         </div>

         {showPreview && files.length > 0 && (
            <div className="space-y-2">
               {files.map((file, index) => (
                  <div key={index} className="border-border bg-background flex items-center gap-3 rounded-lg border p-3">
                     {file.preview ? (
                        <img
                           src={file.preview}
                           alt={file.name}
                           className="h-12 w-12 rounded object-cover"
                           onLoad={() => {
                              if (file.preview) URL.revokeObjectURL(file.preview)
                           }}
                        />
                     ) : (
                        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
                           <FileIcon className="text-muted-foreground h-6 w-6" />
                        </div>
                     )}
                     <div className="flex-1 overflow-hidden">
                        <p className="text-foreground truncate text-sm font-medium">{file.name}</p>
                        <p className="text-muted-foreground text-xs">{formatFileSize(file.size)}</p>
                     </div>
                     <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeFile(file)} disabled={isUploading}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                     </Button>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}
