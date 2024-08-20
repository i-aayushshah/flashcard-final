import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export async function generateFlashcardSuggestion(topic) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Generate a flashcard for the topic: ${topic}\nFront: \nBack: `,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const suggestion = response.data.choices[0].text.trim();
    const [front, back] = suggestion.split('\nBack: ');

    return {
      front: front.replace('Front: ', '').trim(),
      back: back.trim(),
    };
  } catch (error) {
    console.error('Error generating flashcard suggestion:', error);
    return null;
  }
}
