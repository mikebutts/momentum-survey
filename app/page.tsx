import Head from 'next/head';
import SurveyForm from './components/Survey/SurveyForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Momentum Survey</title>
        <meta name="description" content="Feedback survey for the Momentum heating and cooling system." />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800 p-8">
        <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Momentum User Feedback</h1>
          <p className="text-center mb-10 text-lg text-gray-600">
            Help us improve Momentum by answering a few quick questions.
          </p>

          <SurveyForm />
        </div>
      </main>
    </>
  );
}
