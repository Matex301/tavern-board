"use client"

export interface verifyParams {
    expires: string | null,
    id: string | null,
    signature: string | null
    token: string | null
}

export async function fetchVerify(signal: AbortSignal, params: verifyParams) {
    let url = new URL('http://localhost:8000/api/verify');
    url.searchParams.set('expires', params.expires ?? '');
    url.searchParams.set('id', params.id ?? '');
    url.searchParams.set('signature', params.signature ?? '');
    url.searchParams.set('token', params.token ?? '');
    
    try {
        const response = await fetch(url, {signal});
        return response.status;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuests", error);
        return null;
    }
}