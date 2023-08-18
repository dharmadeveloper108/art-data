export const get = (path: string, token: string, method = 'GET') =>
    fetch(path, {
        method,
        headers: { Authorization: `Bearer ${token}` },
    });

export const post = (path: string, token: string, body: unknown) =>
    fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body),
    });