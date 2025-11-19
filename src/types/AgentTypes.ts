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