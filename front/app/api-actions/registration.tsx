"use client";

interface Send {
    username: string,
    email: string,
    plainPassword: string
}

export async function createUser(username: string, email : string, password: string) {
    let url = new URL('http://localhost:8000/api/users');
    let send: Send = {
        "username": username,
        "email": email,
        "plainPassword": password
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(send),
            headers: {
                "Content-Type": "application/ld+json",
                "Accept": "application/ld+json"
            }
        });

        const data = await response.json();
        return {status: response.status, message: data.detail};
    } catch(error) {
        console.error("createUser", error);
        return null;
    }
}