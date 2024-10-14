export const addItem = async (
  question: string,
  answer: string,
  email: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          answer: answer,
          email: email,
        }),
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
