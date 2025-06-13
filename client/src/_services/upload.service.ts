import { authHeader } from "@/_helpers/auth-header"
import { handleResponse } from "@/_helpers/handle-response"
import { headers } from "next/headers"

class UploadService {

  constructor() { }

  upload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file)

    const requestOptions = {
      method: 'POST',
      headers: authHeader('form'),
      body: formData
    }
    return await handleResponse(await fetch('/api/upload'))

  }

  uploadMany = async (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const requestOptions = {
      method: 'POST',
      headers: authHeader('form'),
      body: formData
    }
    return await handleResponse(await fetch('/api/upload/images', requestOptions));
  }

  delete = async (fileName: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/upload/image/${fileName}`, requestOptions))
  }

  deleteMany = async (values: { fileNames: string[] }) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
      boody: JSON.stringify(values)
    }
    return await handleResponse(await fetch('/api/upload/images', requestOptions))
  }
}