# Portfolio 2026

## 📸 Screenshots

<img width="1903" height="921" alt="image" src="https://github.com/user-attachments/assets/39ce01b8-673c-4bd1-a1bd-d790476303b3" />
<img width="1906" height="917" alt="image" src="https://github.com/user-attachments/assets/4cf65b30-f30b-4b3f-902b-673f7bb77f2e" />
<img width="1906" height="921" alt="image" src="https://github.com/user-attachments/assets/0b520bce-1d6f-4dc2-afb9-fa8c6fe86ee0" />


## 🛠️ Tech Stack

### Core
- **Next.js 16.1.3** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **tailwind-merge** - Merge Tailwind classes safely
- **Custom Fonts** - Commit Mono for terminal aesthetic

### Data Fetching
- **Apollo Client 4.1.0** - GraphQL client
- **Hygraph** - Headless CMS (GraphQL)
- **GraphQL Code Generator** - Type-safe GraphQL queries

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Popover, Progress, Tabs, Command, etc.
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Forms & Validation
- **React Hook Form** - Form state management
- **Resend** - Email service for contact form

### Other
- **next-themes** - Theme management
- **embla-carousel-react** - Carousel component
- **cmdk** - Command palette component

## 📁 Project Structure

```
portfolio-2026/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/      # Contact form endpoint
│   │   └── preload/      # Preload data endpoint
│   ├── styles/           # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── not-found.tsx     # 404 page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── shared/           # Shared components (Navbar, Preloader)
│   ├── portfolio-hero/   # Hero section
│   ├── experience-section/
│   ├── projects-section/
│   ├── technologies-section/
│   └── contact-section/
├── hooks/                 # Custom React hooks
│   ├── useSectionNavigation.ts
│   ├── useImageLoader.ts
│   └── usePreloader.ts
├── utils/                 # Pure utility functions
│   ├── preloadImage.ts
│   └── extractImageUrls.ts
├── lib/                   # Shared libraries
│   ├── apolloClient.ts   # Apollo Client setup
│   ├── contact.ts        # Contact form logic
│   └── utils.ts          # Utility functions
├── fetchers/              # Data fetching functions
│   ├── getAuthor.ts
│   ├── getExperiences.ts
│   ├── getProjects.ts
│   └── getTechnologies.ts
├── queries/               # GraphQL queries
│   └── *.graphql
├── types/                 # TypeScript types
│   └── graphql.ts         # Generated GraphQL types
└── public/                # Static assets
    ├── documents/         # Resume PDF
    └── fonts/            # Custom fonts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-2026
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
# Hygraph GraphQL Endpoint
# HYGRAPH_ENDPOINT=your_endpoint

# Resend API Key (for contact form)
RESEND_API_KEY=your_resend_api_key

# Contact Email (where form submissions are sent)
CONTACT_EMAIL=your-email@example.com
```

4. Generate GraphQL types:
```bash
npm run codegen
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types from schema

## 🎨 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **No Default Exports**: Use named exports for components
- **No React.FC**: Use regular function components
- **Strong Typing**: All functions and components must be strongly typed
- **twMerge**: Always use `twMerge` for combining Tailwind classes

### Component Structure

- **Server Components by Default**: Use client components only when needed
- **Separation of Concerns**: 
  - UI logic in components
  - Business logic in hooks
  - Pure functions in utils
  - Data fetching in fetchers

### File Organization

- **Components**: `components/` - UI components only
- **Hooks**: `hooks/` - Custom React hooks (one responsibility per hook)
- **Utils**: `utils/` - Pure helper functions (no side effects)
- **Lib**: `lib/` - Shared utilities (non-React)
- **Fetchers**: `fetchers/` - Data fetching functions with Zod validation

### useEffect Best Practices

Use named inner functions for clarity:

```typescript
useEffect(() => {
  function handleDataChange() {
    // logic here
  }
  
  handleDataChange();
}, [dependencies]);
```

## 🔧 Configuration

### Hygraph Setup

The project uses Hygraph (formerly GraphCMS) as the headless CMS. Update the GraphQL endpoint in:
- `lib/apolloClient.ts` - Apollo Client configuration
- `codegen.ts` - GraphQL Code Generator configuration

### Image Domains

Configure allowed image domains in `next.config.ts`:

```typescript
images: {
  domains: ["your-image-domain.com"],
}
```

## 📦 Data Fetching

All data is fetched server-side in `app/page.tsx` using `Promise.all` for parallel fetching. Fetchers use:

- **React `cache`**: Request deduplication within the same render
- **Conditional Caching**: 
  - Development: `network-only` with `revalidate: 0` (fresh data)
  - Production: `cache-first` with `revalidate: 3600` (1 hour cache)

## 🎯 Key Features Implementation

### Terminal Navigation

The navbar uses a command-style interface:
- Type section names or IDs to search
- Autocomplete with section descriptions
- Smooth scrolling to selected sections
- Keyboard navigation (Enter, Escape)

### Preloader

- Fast loading animation (~1.4 seconds)
- Progress indicators
- Background image preloading
- Skeleton states for content

### Image Loading

- Automatic preloading of all images
- Skeleton states in modals
- Smooth fade-in transitions
- Optimized loading strategy

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Make sure to set all required environment variables in your deployment platform:

- `RESEND_API_KEY` - Required for contact form
- `CONTACT_EMAIL` - Required for contact form

### Recommended Platforms

- **Vercel** - Optimized for Next.js
- **Netlify** - Great Next.js support
- **Any Node.js hosting** - Standard Next.js deployment

## 📝 License

This project is private and proprietary.

## 👤 Author

**Andrii Naida**
- Portfolio: [andrewnaida.dev](https://andrewnaida.dev)
- Full Stack Developer

---

Built with ❤️ using Next.js and TypeScript
