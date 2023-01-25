# Real-time Voice Translation App 

React.js app that allows users to upload an audio file and receive a translated transcription of the audio. The application is using the Assembly AI API for transcribing the audio file and the Azure Cognitive Services API for translating the text to a different language.

The application uses the useState hook to manage the component's state and the useEffect hook to trigger a side-effect when a certain condition is met, in this case, when the user uploads an audio file. The useEffect hook is used to make an API call to the Assembly AI API to upload the audio file and retrieve the upload URL which is then used in another API call to transcribe the audio file.

The translateWav function is used to make a post request to the Assembly AI API to transcribe the audio file and the checkStatus function is used to check the status of the transcription process, when the transcription is complete the text is set in the component's state and the translateText function is called to translate the text to a different language.

The application is also using Material-UI components for UI elements such as the Button component, the Select component, the FormControl component, the InputLabel component, and the MenuItem component. The uuid4 library is used to generate unique ids for the transcription process.

The application also allows users to input custom API keys in case they want to use their own Assembly AI and Azure Cognitive Services API keys. The A_APIChange and Z_APIChange functions are used to handle the changes in the input fields and the handleAPIForm function is used to toggle the visibility of the custom API key input fields.

The speakText function is used to speak the translated text using the browser's speech synthesis API.

# Running The App

1. Clone the repository

```
git clone https://github.com/<your-username>/audio-transcription-translation-app.git
```

2. Navigate to the project directory

```
cd audio-transcription-translation-app
```
Install the required dependencies

```
npm install
```

Create a .env file in the root of the project and add your API keys

```
touch .env
```
```
ASSEMBLY_AI_API_KEY=your_assembly_ai_api_key
AZURE_COGNITIVE_SERVICES_API_KEY=your_azure_cognitive_services_api_key
```
Start the development server

```
npm start
```

The application should be running on http://localhost:3000
