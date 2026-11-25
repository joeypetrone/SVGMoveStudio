# SVG Move Studio

A browser-based editor for building SVG graphics. Add shapes from a toolbox, move, scale, stretch and recolor them on a live canvas, view the generated SVG code, and save your work to your account.

## Features

- **Shape toolbox**: circle, ellipse, line, path, polygon, polyline and rectangle
- **Element editors**: position, scale, stretch, points, color (fill / stroke / opacity), and delete
- **Live SVG code view**: see and copy the markup for what's on the canvas
- **Saved SVGs**: sign in, name and save drawings, and reopen them later
- **Accounts**: sign up, sign in and password reset through Firebase Authentication
- **Documents**: built-in overview and reference pages for SVG elements

## Tech stack

| Part | Tech |
| --- | --- |
| Front end (`svgmovestudio.ui/`) | React 17, React Router, Reactstrap / Bootstrap 4, Sass, Axios |
| API (`SVGMoveStudio/`) | ASP.NET Core (.NET 10), Dapper, Microsoft.Data.SqlClient |
| Database | SQL Server |
| Auth | Firebase Authentication (the API validates Firebase JWTs) |
| Hosting | Front end on Firebase Hosting; API on Azure App Service |

## Project layout

```
SVGMoveStudio.sln
SVGMoveStudio/            ASP.NET Core Web API
  Controllers/            Users, SVGs, Elements, ElementTypes
  Data/                   Dapper repositories and SVG element validation
  Models/                 User, SVG, Element, ElementType, SaveSvgRequest
svgmovestudio.ui/         React app (Create React App)
  src/components/pages/   Home, SVGEditor, Documents, Auth, Register, ForgotPassword
  src/components/shared/  Editor panels, element editors, SVG shapes, modals, navbars
  src/helpers/data/       API and Firebase calls
```

## Getting started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) and npm
- SQL Server (LocalDB, Express or Developer edition)
- A Firebase project with Email/Password sign-in enabled

### 1. Database

Create a SQL Server database named `SVGMoveStudio` with the tables `User`, `SVG`, `Element` and `ElementType`. The columns match the classes in [`SVGMoveStudio/Models`](SVGMoveStudio/Models).

The default connection string in [`appsettings.json`](SVGMoveStudio/appsettings.json) uses Windows auth against `localhost`:

```
Server=localhost;Database=SVGMoveStudio;Trusted_Connection=true;TrustServerCertificate=true;
```

To point at a different server, override `ConnectionStrings:SVGMoveStudio` with user secrets rather than editing the file:

```powershell
dotnet user-secrets set "ConnectionStrings:SVGMoveStudio" "<your connection string>" --project SVGMoveStudio
```

### 2. API

```powershell
dotnet run --project SVGMoveStudio
```

You can also open `SVGMoveStudio.sln` in Visual Studio and run the **IIS Express** profile, which serves the API at `https://localhost:44368`.

Firebase token validation is set up in [`Startup.cs`](SVGMoveStudio/Startup.cs) for the `svg-move-studio` Firebase project. If you use your own Firebase project, change the `Authority`, `ValidAudience` and `ValidIssuer` values to your project ID.

### 3. Front end

Copy the example config and fill in your Firebase web app settings:

```powershell
Copy-Item svgmovestudio.ui/src/helpers/constants.example.json svgmovestudio.ui/src/helpers/constants.json
```

- `baseUrl`: the API's base URL, ending in `/api` (default `https://localhost:44368/api`)
- `firebaseConfig`: from Firebase console → Project settings → Your apps

`constants.json` is git-ignored, so your keys stay out of the repo.

Then install and start:

```powershell
cd svgmovestudio.ui; npm install; npm start
```

The app opens at `http://localhost:3000`.

## API endpoints

All routes are under `/api`.

| Method | Route | Description |
| --- | --- | --- |
| GET | `/users/firebaseUid` | Get the signed-in user |
| POST | `/users` | Create a user |
| DELETE | `/users/{id}` | Delete a user |
| GET | `/SVGs` | List SVGs |
| GET | `/SVGs/{id}` | Get an SVG |
| GET | `/SVGs/user/{userId}` | List a user's SVGs |
| POST | `/SVGs` | Save a new SVG with its elements |
| PUT | `/SVGs/{id}/elements` | Replace an SVG's elements |
| DELETE | `/SVGs/{id}` | Delete an SVG |
| GET | `/elements` | List elements |
| GET | `/elements/{id}` | Get an element |
| GET | `/elements/bySvgId/{svgId}` | List an SVG's elements |
| GET | `/elements/default` | Default elements for the toolbox |
| DELETE | `/elements/{id}` | Delete an element |
| GET | `/elementTypes` | List element types |
| GET | `/elementTypes/{id}` | Get an element type |

## Deployment

- **Front end**: `npm run deploy` in `svgmovestudio.ui/` builds the app and runs `firebase deploy` (requires the Firebase CLI and `firebase login`).
- **API**: published to Azure App Service with Visual Studio's Web Deploy profile. Logs go to the App Service log stream when App Service logging is turned on.
