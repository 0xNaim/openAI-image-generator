import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  /**
   * Input states
   */
  const [descText, setDescText] = useState('');
  const [imageSize, setImageSize] = useState('small');
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Size for image
   */
  const sizes = ['small', 'medium', 'large'];

  /**
   * It sets the image size to the value of the target.
   */
  const handleSize = (e) => setImageSize(e.target.value);

  /**
   * Form submit handler
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setImageData(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generateimage`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: descText,
          size: imageSize,
        }),
      });
      const data = await response.json();
      setImageData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>OpenAI Image Generator</title>
      </Head>
      <div className={styles.form__wrapper}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h3 className={styles.form__title}>Describe An Image</h3>
          <input
            onChange={(e) => setDescText(e.target.value)}
            className={styles.title__input}
            type="text"
            placeholder="Describe an image"
            required
          />
          <select className={styles.input__select} onChange={handleSize} required>
            <option>Select an option</option>
            {sizes.map((size) => (
              <option key={Math.random()} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button className={styles.btn} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Generate'}
          </button>
        </form>
      </div>

      <div className={styles.image__wrapper}>
        {imageData && <img src={imageData} alt="AI Generated Img" />}
      </div>
    </>
  );
};

export default Home;
