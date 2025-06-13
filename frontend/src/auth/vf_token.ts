export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:3000/auth/me', {
      credentials: 'include',
    });

    return res.ok;
  } catch (err) {
    return false;
  }
}
