import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openAI = new OpenAIApi(configuration);

const handler = async (req, res) => {
  const { text, size } = req.body;

  let imageSize;
  if (size === 'small') {
    imageSize = '256x256';
  } else if (size === 'medium') {
    imageSize = '512x512';
  } else {
    imageSize = '1024x1024';
  }

  try {
    const response = await openAI.createImage({
      prompt: text,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export default handler;
