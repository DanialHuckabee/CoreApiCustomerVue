import axios from "axios";

export interface SignerAppResetResult {
  error: string;
  certificates: CertificateInfo[];
  // Idle = 0,
  // GettingSmartCards = 1,
  // SmartCardFound = 2,
  // NoSmartCard = 3
  signerAppStatus: number;
  signerAppStatusString: string;
  signerAppDllVersion: number;
  signerAppPlatform: string;

}

export interface CertificateInfo {
  serialNumber: string;
  id: string;
  personFullname: string;
  validFrom: string;
  validTo: string;
  citizenshipNo: string;
  data: string;
  pkcsLibrary: string;
  slot: number;
  isFinancialSeal: boolean;
  certificateIndex: number |null;
}

export interface SignerAppPingResult {
  // Idle = 0,
  // GettingSmartCards = 1,
  // SmartCardFound = 2,
  // NoSmartCard = 3
  signerAppStatus: number;
  signerAppStatusString: string;
  signerAppDllVersion: number;
  error: string;
  signerAppPlatform: string;
}

export interface GetSignerAppVersionsResult {
  signerAppWindowsVersion: number;
  signerAppLinuxVersion: number;
  signerAppMacVersion: number;
  signerAppWindowsUrl: string;
  signerAppLinuxUrl: string;
  signerAppMacUrl: string;
}

export interface WebToAvalonSignStepTwoRequest {
    keyId: string;
    keySecret: string;
    state: string;
    pkcsLibrary: string;
    slot: number;
    pin: string;
    certificateIndex:number | null
}

export interface SignStepTwoResult {
  signedData: string;
  error: string;
}

export interface CreateStateOnOnaylarimApiRequest {
  /**
   * Son kullanıcı bilgisayarında bulunan e-İmza Aracı vasıtasıyla alınan, e-imza atarken kullanılacak sertifikadır
   */
  certificate: string;

  /**
   * Atılacak e-imza türüdür, değerler pades, xades ve cades olabilir
   */
  signatureType: string;

  /**
   * Enveloping:2, Enveloped:4. Değer verilmez ise 4, yani Enveloped imza atılır.
   */
  xmlSignatureType?: number;

  /**
   * Enveloping imza durumunda, bu özellik, zarf içinde yer alan nesnenin Encoding (kodlama) özniteliğini içerir. Default değeri http://www.w3.org/2000/09/xmldsig#base64
   */
  envelopingObjectEncoding?: string;

  /**
   * Enveloping imza durumunda, bu özellik, zarf içinde yer alan nesnenin MIME türü (MIME type) özniteliğini içerir. Default değeri application/pdf
   */
  envelopingObjectMimeType?: string;
}


export interface CreateStateOnOnaylarimApiResult {
  state: string;
  keyID: string;
  keySecret: string;
  operationId: string;
  error: string;
}

export interface FinishSignResult {
  isSuccess: boolean;
}

export interface GetFingerPrintRequest {
  operationId: string;
}

export interface MobileSignRequest {
  operationId: string;
}

export interface MobileSignResult {
  isSuccess: boolean;
  error: string;
}

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
