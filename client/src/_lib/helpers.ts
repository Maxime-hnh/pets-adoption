export async function retryOriginalRequest(url: RequestInfo, init: RequestInit, newToken: string): Promise<any> {
  const updatedHeaders = {
    ...(init.headers || {}),
    Authorization: `Bearer ${newToken}`,
  };

  const retryInit: RequestInit = {
    ...init,
    headers: updatedHeaders,
  };
  const retryResponse = await fetch(url, retryInit);
  const retryText = await retryResponse.text();
  return retryText && JSON.parse(retryText);
}