# Contributing to StreamVerse

We welcome contributions to StreamVerse! To maintain a highly polished, production-grade mobile codebase, please review the guidelines below.

---

## 🛠️ Development Guidelines

1.  **Code Quality Standards:**
    *   Airbnb rule compliance: Avoid nested ternary operations, use default exports for single-export modules, and do not use array indexes as React keys.
    *   No warnings/errors: Run `npm run lint` to verify that there are zero ESLint or Prettier violations before submitting changes.

2.  **Performance Checklists:**
    *   Memoize flat list cells using `React.memo` inside item wrapper components.
    *   Wrap callbacks and list measurements inside `useCallback` and `useMemo` hooks.
    *   Ensure all new FlatLists configure performance properties (`initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and `removeClippedSubviews`).

3.  **UI Consistency:**
    *   Prune hardcoded spacing configurations: import coordinates and dimensions from `src/constants`.
    *   Wrap touch elements in `AnimatedPressable` for tactile bouncers.

---

## 📬 Pull Request Workflow

1.  **Create a Feature Branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```

2.  **Apply Commits:**
    *   Prune unused imports.
    *   Maintain consistent formatting: run linter commands inside terminal workspace.

3.  **Submit PR:**
    *   Detail your changes, list items tested, and attach screenshot outputs where applicable.
