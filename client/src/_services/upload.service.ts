import { authHeader } from "@/_lib/auth-header"
import { handleResponse } from "@/_lib/handle-response"

class UploadService {

  constructor() { }

  upload = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('folder', folder)

    const requestOptions = {
      method: 'POST',
      headers: authHeader('form'),
      body: formData
    }
    return await handleResponse(await fetch('/api/upload', requestOptions))
  }

  uploadMany = async (files: File[], folder: string): Promise<string[]> => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    formData.append('folder', folder)
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