export const createUser = async (email: string, provider: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        provider: provider,
      }),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
