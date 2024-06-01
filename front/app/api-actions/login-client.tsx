"use client";

import { User } from "@/app/types/User";

interface Send {
    username: string,
    password: string
}

export async function fetchJWT(username: string, password: string) {
    let url = new URL('http://localhost:8000/api/login');
    let send: Send = {
        "username": username,
        "password": password
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(send),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if(data.token && response.status == 200) {
            localStorage.setItem('Authorization', data.token);
        }
        
        return {token: data.token, status: response.status, message: data.message};
    } catch(error) {
        console.error("fetchLogin", error);
        return null;
    }
}

export function deleteJWT() {
    localStorage.removeItem('Authorization');
}

export function getUserId() {
    const token = localStorage.getItem('Authorization');
    if(!token) {
        return null;
    }
    
    const parse = parseJwt(token);
    //console.log('exp:' + parse.exp * 1000);
    //console.log('now:' + (new Date()).getTime());
    if((parse.exp * 1000) < (new Date()).getTime()) {
        deleteJWT();
        return null;
    }

    return parse?.id;
}

export function hasRole(role: string) {
    const token = localStorage.getItem('Authorization');
    if(!token) {
        return null;
    }
    
    const parse = parseJwt(token);
    //console.log('exp:' + parse.exp * 1000);
    //console.log('now:' + (new Date()).getTime());
    if((parse.exp * 1000) < (new Date()).getTime()) {
        deleteJWT();
        return null;
    }

    return parse?.roles.includes(role);
}

export function getJWT() {
    return localStorage.getItem('Authorization');
}

interface JWTpayload {
    iat: number,
    exp: number,
    roles: Array<string>,
    id: string
}

function parseJwt(token: string): JWTpayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(base64.toString(), 'base64').toString('ascii')) as JWTpayload;
}

export async function fetchUser() {
    const token = getJWT();
    if(!token)
        return null;
    const parse = parseJwt(token);

    let url = new URL(`http://localhost:8000/api/users/${parse.id}`);
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/ld+json",
                "Accept": "application/ld+json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        return data as User;
    } catch(error) {
        console.error("getUser", error);
        return null;
    }
}