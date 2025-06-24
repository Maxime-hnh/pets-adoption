import { authHeader } from "@/_lib/auth-header"
import { handleResponse } from "@/_lib/handle-response"

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

  uploadMany = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    const requestOptions = {
      method: 'POST',
      headers: authHeader('form'),
      body: formData
    }
    const urls = await handleResponse(await fetch('/api/upload/images', requestOptions));
    return urls;
  }

  deleteFile = async (fileName: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/upload/image/${encodeURIComponent(fileName)}`, requestOptions))
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

export const uploadService = new UploadService();