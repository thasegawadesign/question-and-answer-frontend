export const getUser = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/users?email=${email}`,
      {
        method: "GET",
      }
    );
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
