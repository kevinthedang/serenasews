declare global {
  interface Window {
    EMAILJS?: {
      publicKey?: string;
      serviceId?: string;
      templateId?: string;
    };
  }
}

export {};
