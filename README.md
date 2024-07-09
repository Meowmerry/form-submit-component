# Form Submit Component

This project implements a Form Submit Component as per the Developer Exercise requirements. 
The component serves as a command bar at the bottom of a form, displaying status and action buttons.

## Features

- Status Icon
- Status Message (with support for embedded links)
- Submit button
- Reset button
- Dynamic state handling for:
  - No changes
  - Unsubmitted changes
  - Validation errors
  - Submitting state
  - Success state
  - Error state
- Clickable error count to display validation errors
- Customizable messages and icons

## Technologies Used

- React
- TypeScript
- Material-UI
- Zustand (for state management)
- React Hook Form
- Zod (for schema validation)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:
`git clone https://github.com/your-username/form-submit-component.git`

2. Navigate to the project directory:
`cd form-submit-component`

3. Install dependencies:
`npm install`

### Running the Application

To start the development server:
`npm start`

The application will be available at `http://localhost:3000`.

## Project Structure
- src/
    - components/
        - FormSubmitComponent/
        - StatusIcon.tsx
        - StatusMessage.tsx
        - SubmitButton.tsx
        - ResetButton.tsx
    - index.tsx
    - App.tsx
    - index.tsx


## Usage

The `FormSubmitComponent` is designed to be I/O and validation agnostic. It takes all necessary state as props:

```tsx
<FormSubmitComponent
  changeCount={changeCount}
  errorCount={errorCount}
  isSubmitting={isSubmitting}
  isSuccess={isSuccess}
  isError={isError}
  onSubmit={handleSubmit}
  onReset={handleReset}
  onErrorClick={handleErrorClick}
  statusMessage={statusMessage}
  errorMessage={errorMessage}
/>
```

## Contributing
- Contributions are welcome! Please feel free to submit a Pull Request.

## License
- This project is licensed under the MIT License.

This README provides an overview of the project, its features, how to set it up, and how to use the Form Submit Component. It also includes sections for customization, testing (which you can fill in once you've implemented tests), and contribution guidelines.

You may want to adjust some details like the repository URL, specific version requirements, or add more detailed usage examples depending on your exact implementation and needs.