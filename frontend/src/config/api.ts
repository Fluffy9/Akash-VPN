// API Configuration
const getApiUrl = (endpoint: string = 'regions') => {
    // Check for environment variable first
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL.replace('/regions', `/${endpoint}`);
    }

    // Check for environment-specific URLs
    if (process.env.NODE_ENV === 'production') {
        return `/api/${endpoint}`;
    }

    // Development fallback - try to detect the backend port
    const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || '4001';
    return `http://localhost:${backendPort}/api/${endpoint}`;
};

export const API_ENDPOINTS = {
    regions: () => getApiUrl('regions'),
    stats: () => getApiUrl('stats'),
    health: () => getApiUrl('health'),
} as const;

export default API_ENDPOINTS;
