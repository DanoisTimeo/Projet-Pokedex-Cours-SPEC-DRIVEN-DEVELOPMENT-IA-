/// <reference types="vite/client" />

// Type declarations for CSS imports
declare module "*.css" {
    const content: string;
    export default content;
}
