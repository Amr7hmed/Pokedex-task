
#  Pokédex – React + TypeScript

A responsive Pokémon browser built as a frontend interview task for a **Senior React Engineer** role.

The app allows users to:

- Browse Pokémon in a grid with **page-based pagination**
- Browse Pokémon with **infinite scroll / Load More** behavior
- View a **dedicated detail page** for each Pokémon with rich information

Built with **Vite + React + TypeScript + Tailwind CSS**.

---
##  Live Demo & Repository

- **Live URL:** _<add your deployed URL here>_  
- **GitHub Repo:** _<add your repository URL here>_

---

## Features

### 1. Pokémon List – Pagination View

- **Route:** `/`
- Displays a grid of Pokémon cards (name + sprite)
- Pagination controls with:
  - Previous / Next buttons
  - Page numbers
  - Current page indicator

- Uses the endpoint:

  ```http
  GET /pokemon?limit={limit}&offset={offset}
````

---

### 2. Pokémon List – Infinite Scroll / Load More View

* **Route:** `/load-more`
* Displays the same grid layout as the pagination view
* Uses **"Load More" via infinite scroll**:

  * When the user reaches near the bottom of the page, the next batch is loaded
  * Previously loaded Pokémon remain visible
  * No duplicates (new results are merged uniquely by name)
* Shows:

  * Total loaded Pokémon vs total available
  * A message when there are no more Pokémon to load

---

### 3. Pokémon Details Page

* **Route:** `/pokemon/:id`
* Dedicated page (not a modal) that displays:

  * Name
  * ID (formatted with leading zeros, e.g. `#001`)
  * Official artwork sprite (with fallback to default sprite)
  * Types (rendered as badges)
  * Height (in meters)
  * Weight (in kg)
  * Base stats (with visual progress bars)
  * Abilities (hidden abilities are marked)
  * Base experience

---

### 4. Loading & Error States

* **Loading:**

  * Global loading spinner while fetching data
  * Separate loading state when loading more items in infinite scroll

* **Error:**

  * Reusable error message component
  * Includes a **Retry** button that re-triggers the failed request

---

### 5. Responsiveness

* Fully responsive using **Tailwind CSS**

* Grid layout adapts smoothly across:

  * **Mobile:** 1–2 columns
  * **Tablet:** 2–3 columns
  * **Desktop:** 4 columns

* Layout is centered inside a card-like container inspired by the reference designs.

---

##  Tech Stack

* **React** (Vite)
* **TypeScript**
* **React Router v6**
* **Axios** for HTTP requests
* **Tailwind CSS** for styling

**Architectural extras:**

* Custom hooks for data fetching and state:

  * `usePokemonsPagination`
  * `usePokemonsLoadMore`
  * `usePokemonDetails`
  * `useInfiniteScroll`
* API layer in `src/api/pokemonApi.ts`
* Strong typing via `src/types/pokemon.ts`

---

##  Project Structure

```bash
src/
  api/
    pokemonApi.ts          # Axios-based API layer (list + details)

  components/
    layout/
      Layout.tsx           # Main layout wrapper (background + container)
      Header.tsx           # Top header with tabs (Page Controls / Infinite Scroll)
    pokemon/
      PokemonCard.tsx      # Single Pokémon card
      PokemonGrid.tsx      # Responsive grid layout
      PaginationControls.tsx
      LoadMoreButton.tsx   # (if used separately from infinite scroll)
      LoadingSpinner.tsx
      ErrorMessage.tsx

  hooks/
    usePokemonsPagination.ts
    usePokemonsLoadMore.ts
    usePokemonDetails.ts
    useInfiniteScroll.ts

  pages/
    PaginationPage.tsx     # "/" – page-controlled list
    LoadMorePage.tsx       # "/load-more" – infinite scroll view
    PokemonDetailsPage.tsx # "/pokemon/:id" – details page
    NotFoundPage.tsx       # 404 route

  router/
    AppRouter.tsx          # React Router configuration

  types/
    pokemon.ts             # Shared TypeScript types

  styles/
    # (optional additional styles if needed besides Tailwind)

  App.tsx
  main.tsx
```

---

##  Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>.git
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

The `.env` file contains:

```env
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

> You can change this if you want to point to a different API base URL.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will be available at the URL shown in the terminal (usually `http://localhost:5173` for Vite).

### 5. Build for production

```bash
npm run build
npm run preview
```

---

##  API Reference

The app uses the public **PokéAPI** via:

```env
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

### Endpoints used:

* **List Pokémon (paginated):**

  ```http
  GET /pokemon?limit={limit}&offset={offset}
  ```

* **Get single Pokémon details:**

  ```http
  GET /pokemon/{id}
  ```

---

##  Architecture & State Management

### Data Fetching

All API access is abstracted into `src/api/pokemonApi.ts`:

* `getPokemons(limit, offset, params)`
* `getPokemonById(idOrName)`

Components do **not** talk to Axios directly; instead, they use custom hooks for a cleaner and more testable structure.

---

### Custom Hooks

#### `usePokemonsPagination`

* Manages:

  * `page`
  * list of Pokémon
  * total count
  * loading state
  * error state
* Calculates `totalPages` and exposes:

  * `goToPage(page)`
  * `goToNextPage()`
  * `goToPreviousPage()`
  * `retry()`

#### `usePokemonsLoadMore`

* Maintains an **accumulated** list of Pokémon.
* Tracks:

  * `hasMore`
  * `isLoading`
  * `isLoadingMore`
  * `error`
* Ensures **no duplicates** when appending new Pokémon.
* Exposes:

  * `loadMore()`
  * `retry()`

#### `usePokemonDetails`

* Fetches details for a single Pokémon by `id`.
* Exposes:

  * `pokemon`
  * `isLoading`
  * `error`
  * `retry()`

#### `useInfiniteScroll`

* Attaches a scroll listener to `window`.
* When the user scrolls near the bottom of the page and `hasMore === true`, it triggers the provided callback.
* Includes a small delay/debounce to avoid spamming requests.

---

##  UI & UX Notes

* Layout and card styling are inspired by the reference designs provided with the task.
* Header shows:

  * App title: **Pokédex**
  * Small subtitle/description
  * Two-tab switch:

    * **Page Controls**
    * **Infinite Scroll**
* Active tab is visually highlighted.
* Pokémon cards:

  * Are clickable
  * Slightly elevate on hover
  * Center the sprite image
  * Show name (capitalized) and formatted ID (`#001`, `#002`, …)

---

## Task Coverage

This implementation covers all of the requested task points:

*  Pagination view with page controls
*  Infinite scroll / load more view
*  Dedicated details page (separate route, not modal)
*  Loading and error states with retry
*  Fully responsive layout (desktop, tablet, mobile)
*  Modular, testable architecture (API layer + hooks + UI components)
*  Publicly deployable via Vercel / Netlify / Cloudflare Pages
*  Environment variables handled via `.env` / `.env.example`

---

##🚀 Possible Improvements (If More Time Is Given)

* Use **React Query** for data fetching, caching, and background refreshing.
* Add tests:

  * Unit tests for hooks
  * Integration tests for pages and routing
* Use **type-based colors** for Pokémon type badges.
* Add search / filter:

  * Filter by name
  * Filter by type
* Add skeleton loaders instead of a spinner for a smoother perceived performance.

---

##  Timebox Note

This project was implemented within the suggested **4-hour timebox**, with a focus on:

* Clear and extensible architecture
* Strong TypeScript typing
* UX and layout close to the provided designs
* Clean, readable code and component structure

```
