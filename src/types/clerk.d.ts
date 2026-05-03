export {}

declare global {
    interface CustomJwtSessionClaims {
        isOnboarded?: boolean;
    }
}