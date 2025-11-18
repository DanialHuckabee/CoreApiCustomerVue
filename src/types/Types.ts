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

export interface MobileSignRequestV2 {
  /**
   * Her bir istek için tekil bir GUID değeri verilmelidir.
   * Bu değer aynı e-imza işlemi ile ilgili olarak daha sonraki metodlarda kullanılır.
   */
  operationId: string;

  /**
   * Atılacak e-imza türüdür. Değerler:
   * - pades
   * - xades
   * - cades
   */
  signatureType: string;

  /**
   * İmza atarken kullanılacak mobil imzaya ait telefon numarasıdır.
   * Örnek: 5446786666
   */
  phoneNumber: string;

  /**
   * Mobil imza telefon numarasının bağlı olduğu operatör.
   * Örnek: TURKCELL, VODAFONE, AVEA
   */
  operator: string;

  /**
   * Mobil imza sahibi kişinin T.C. kimlik numarası.
   * Verilirse sertifika içindeki TC ile kontrol yapılır.
   */
  citizenshipNo?: string | null;

  /**
   * Sadece CADES imzalar için.
   * Null geçilirse BES türünde imza atılır.
   */
  signatureLevel?: SignatureLevelForCades | null;

  /**
   * Seri imza atılacaksa hedeflenecek imza yolu bilgisi.
   * Örnekler:
   * - "" (hiç imza yoksa)
   * - "S0"
   * - "S0:S0"
   * Parallel imzada yok sayılır.
   */
  signaturePath?: string | null;

  /**
   * Türk e-imza profilleri: P1, P2, P3, P4
   * Şu anda sadece P4 destekleniyor.
   * Profil istenmiyorsa null geçilir.
   */
  signatureTurkishProfile: string | null;

  /**
   * Seri veya paralel imza atılacağını belirtir.
   * Değerler: SERIAL, PARALLEL
   * Boş geçilirse PARALLEL kabul edilir.
   */
  serialOrParallel: string;
}

export interface MobileSignResult {
  isSuccess: boolean;
  error: string;
}

export enum SignatureLevelForCades {
  /** BES (Basic Electronic Signature) */
  aslBES = 6,

  /** EPES (Electronic Signature with an Explicit Policy) */
  aslEPES = 7,

  /** T (Timestamped) */
  aslT = 8,

  /** C (T with revocation references) */
  aslC = 9,

  /** X Type 1 (C with an ES-C timestamp, CAdES only) */
  aslXType1 = 11,

  /** X Type 2 (C with a CertsAndCRLs timestamp, CAdES only) */
  aslXType2 = 12,

  /** X-L Type 1 (C with revocation values and an ES-C timestamp, CAdES only) */
  aslXLType1 = 14,

  /** X-L Type 2 (C with revocation values and a CertsAndCRLs timestamp, CAdES only) */
  aslXLType2 = 15,

  /** A (archived) */
  aslA = 16,
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
