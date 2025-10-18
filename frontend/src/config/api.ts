// API Configuration
const getApiUrl = (endpoint: string = 'regions') => {
    // Check for environment variable first
    if (process.env.NEXT_PUBLIC_API_URL) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL.trim();
        if (!apiUrl) {
            throw new Error('NEXT_PUBLIC_API_URL is empty or contains only whitespace');
        }
        let baseUrl: string;
        try {
            const url = new URL(apiUrl);
            baseUrl = `${url.origin}${url.pathname}`;
        } catch {
            if (apiUrl.endsWith('/regions')) {
                baseUrl = apiUrl.slice(0, -8);
            } else {
                baseUrl = apiUrl;
            }
        }
        const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${normalizedBase}/${normalizedEndpoint}`;
    }

    // Check for environment-specific URLs
    if (process.env.NODE_ENV === 'production') {
        return `/api/${endpoint}`;
    }

    // Development fallback - use direct port access for SSH tunneling
    const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || '3004';
    return `http://localhost:${backendPort}/api/${endpoint}`;
};

export const API_ENDPOINTS = {
    regions: () => getApiUrl('regions'),
    stats: () => getApiUrl('stats'),
    health: () => getApiUrl('health'),
} as const;

export default API_ENDPOINTS;
