declare global {
    interface Window {
      CaravanCalculatorWidget: {
        init: (selector: string) => void;
      };
    }
  }
  
  export {};
  