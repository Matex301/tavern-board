"use server";

import { cookies } from "next/headers";

interface Send {
    username: string,
    password: string
}

export async function getJWT(username: string, password: string) {
    let url = `http://localhost:8000/api/login`;
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

        if(data.token) {
            const parse = parseJwt(data.token);
            cookies().set('Authorization','Bearer ' +  data.token, {expires: (parse.exp * 1000)});
            const cook = cookies().get('Authorization');
            console.log(cook);
        }
        return data.token;
    } catch(error) {
        console.error("fetchLogin", error);
        return null;
    }
}

export async function deleteJWT() {
    cookies().delete('Authorization');
}

export async function getUserId() {
    const token = cookies().get('Authorization');
    if(!token) {
        return null;
    }

    return parseJwt(token.value);
}

interface JWTpayload {
    iat: number,
    exp: number,
    roles: [],
    id: string
}

function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(base64.toString(), 'base64').toString('ascii')) as JWTpayload;
}