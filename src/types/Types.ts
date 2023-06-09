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
    pin: string;
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

export interface SignStepTwoResult {
    signedData: string;
    error: string;
}

export interface CreateStateOnOnaylarimApiResult {
    state: number;
    keyID: number;
    keySecret: number;
    operationId: string;
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

// Kendi ortamınızdaki server side projesinin URL'si ile değiştiriniz.
export const yourWebApiUrl = "https://localhost:7294";
