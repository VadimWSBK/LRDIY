// global.d.ts or cssModules.d.ts

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }

  
  declare module '*.css';
  declare module '*.scss';
  