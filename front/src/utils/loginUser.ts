export async function loginUser(data: { email: string; password: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to log in');
    }

    const result = await response.json();
    return result.token; // Devuelve el token de autenticación
}