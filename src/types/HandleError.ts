import axios from "axios";

export function HandleError(error: Error): string {
  if (axios.isAxiosError(error)) {
    if (error.code && error.code === "ERR_NETWORK") {
      return "Sunuculara erişilemedi.";
    } else if (error.response !== undefined && error.response !== null) {
      if (error.response.status === 401) {
        return "Yetkisiz erişim. Giriş sayfasına yönlendirileceksiniz.";
      } else if (error.response.status === 500) {
        return "Sunucuda hata oluştu.";
      } else if (error.response.status === 501) {
        return "Bilinmeyen fonksiyon.";
      } else if (error.response.status === 404) {
        return "Bilinmeyen fonksiyon.";
      } else if (error.response.status === 0) {
        return "Sunuculara erişilemedi.";
      } else {
        return error.response.status.toString();
      }
    } else if (error.request !== undefined && error.request !== null) {
      return "Sunuculara erişilemedi.";
    } else {
      if (error.message !== undefined && error.message !== null) {
        return error.message;
      } else {
        return error.name;
      }
    }
  } else {
    return error.message;
  }
}