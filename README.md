# Nova AI 5.0

A free, local-first, bilingual (Dutch/English) AI PWA starter.

## Included
- Responsive website / installable PWA
- WebLLM local inference
- Model selector (two compact model configurations)
- Browser-local chat history, memory, settings and notes
- Agent task planner (AI-generated plans; no unrestricted external actions)
- Local date/time and note tools with confirmation
- Text/Markdown/CSV/JSON/HTML/log file attachment (text extraction)
- Browser speech recognition when supported and speech synthesis
- Local owner dashboard and JSON backup export/import
- Service worker shell cache

## Important limitations
- The iPhone 13 may not have enough available memory for every model. Start with the smallest model and close other tabs/apps. WebGPU support does not guarantee model-load success.
- Local inference runs only while the app is open. It is not a background server.
- Data is stored in the current browser profile. There are no accounts, remote database, or cross-device sync in this version.
- The dashboard is local-only, not a secure multi-user admin console.
- No remote web search is included. The app does not pretend to browse.
- Voice input depends on browser speech-recognition support and may use browser/OS speech services; it is not guaranteed to be fully on-device.
- First model load needs internet to download model assets. Once cached, availability depends on browser storage policies.
- Never store passwords, API keys, or sensitive personal information in browser memory or a public repository.

## Deploy using GitHub Pages
1. Create a public repository named `nova-ai`.
2. Upload all files in this folder to the repository root.
3. Open repository Settings -> Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select `main` and `/ (root)`, then Save.
6. Wait for the Pages URL, usually `https://YOUR-USERNAME.github.io/nova-ai/`.
7. Open the HTTPS URL in Safari on iPhone.
8. In Safari use Share -> Add to Home Screen.

GitHub Pages is static hosting. Do not use it for secrets, authentication endpoints, or a private database.

## Test
1. Open the deployed HTTPS site.
2. Open Models.
3. Choose the smallest model available in the list.
4. Tap Load model and wait for the download and initialization.
5. Return to Chat and send a short prompt.
6. Try Memory, Agent workspace, Settings and Dashboard.

## Local development
You can also serve this folder with any local static web server. ES modules and service workers require a secure context (HTTPS or localhost). Opening index.html directly as a file will not work reliably.

## Model IDs
The model IDs in the selector are WebLLM model registry IDs. If the upstream registry changes, check the official WebLLM model records and update the IDs.
