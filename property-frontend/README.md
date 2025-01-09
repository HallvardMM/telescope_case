# Remix Frontend Application

This is a Remix application designed as a frontend for managing portfolios, properties, and users. The application utilizes Tailwind CSS and shadcn for styling, along with React-Leaflet for map-based functionalities. It is structured to support features like creating properties, displaying them in lists or maps, and interacting with backend APIs.

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm (>= 7.x)
- A running backend

### Run project

```bash
npm install
```

```bash
npm run dev
```

## Project structure

```bash
├── app/
│   ├── components/        # Reusable components for UI and icons
│   │   ├── icons/         # Icon components
│   │   │   └── map.tsx
│   │   └── ui/            # shadcn-based reusable UI components
│   │       ├── button.tsx
│   │       ├── switch.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── use-toast.ts   # Toast notification hook
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── routes/            # Route components and layouts
│   │   ├── user.$id/      # User-related routes
│   │   ├── user.$userId.portfolio.$id/
│   │   │   ├── propertyList.tsx
│   │   │   ├── propertyMap.client.tsx
│   │   │   └── route.tsx  # Portfolio details page
│   │   ├── user.$userId.portfolio.$portfolioId.create-property/
│   │   │   ├── kartverketApi.ts
│   │   │   ├── mapSelector.client.tsx
│   │   │   └── route.tsx  # Property creation page
│   │   ├── user.$userId.portfolio.$portfolioId.property.$id/
│   │   │   └── route.tsx  # Property details page
│   │   └── _index/
│   │       └── route.tsx  # Home page
│   ├── styles/            # Global styles
│   │   └── global.css
│   ├── types/             # TypeScript types for the app
│   │   ├── portfolio.ts
│   │   ├── property.ts
│   │   └── user.ts
│   ├── utils/             # API interaction utilities
│   │   └── api.ts
│   ├── entry.client.tsx   # Remix client entry
│   ├── entry.server.tsx   # Remix server entry
│   ├── root.tsx           # Root component
│   └── tailwind.css       # Tailwind CSS styles
```
