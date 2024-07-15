### Diagram: Form Submit Component Structure

+------------------------------------------------------+
| Form Component                                       |
|                                                      |
| +--------------------------------------------------+ |
| | Form Content                                     | |
| |  (Input fields, etc.)                            | |
| |                                                  | |
| | +----------------------------------------------+ | |
| | | Form Submit Component                        | | |
| | |                                              | | |
| | | +-------------+  +------------------------+  | | |
| | | | Status Icon |  | Status Message         |  | | |
| | | |             |  |                        |  | | |
| | | |             |  | (With Links if any)    |  | | |
| | | +-------------+  +------------------------+  | | |
| | |                                              | | |
| | | +------------------------------------------+ | | |
| | | | Actions (Buttons)                        | | | |
| | | |                                          | | | |
| | | | +-----------------+  +----------------+  | | | |
| | | | |      Submit     |  |     Reset    |    | | | |
| | | | |      Button     |  |     Button   |    | | | |
| | | | +-----------------+  +--------------+    | | | |
| | | +------------------------------------------+ | | |
| | +----------------------------------------------+ | |
| +--------------------------------------------------+ |
|                                                      |
+------------------------------------------------------+


### Description of Components and Features

1. **Form Component**
    - **Form Content:** This contains the main form fields such as input fields, dropdowns, checkboxes, etc.
    - **Form Submit Component:** This is the component we are focusing on.

2. **Form Submit Component**
    - **Status Icon:** Displays the current status icon (e.g., loading spinner, error icon, success icon).
    - **Status Message:** Displays the current status message. This can include links and other HTML fragments.
    - **Actions:**
        - **Submit Button:** Clickable when there are valid changes to submit. Becomes unclickable during submission or when there are validation errors.
        - **Reset Button:** Resets the form to its initial state.
        - **Other Actions:** Any additional action buttons as needed.

### Features
- **No Changes:** Displays a "no changes" message and makes the action buttons unclickable.
- **Unsubmitted Changes:** Displays the change count and makes the submit button clickable. If there are validation errors, displays the error count instead and makes the submit button unclickable.
- **Submit Button Click:**
    - Shows "submitting" status with an indeterminate progress spinner.
    - On error, shows an "error: failed to save..." message with an error icon. The error message is clickable to open a popup with full error information.
    - On success, shows a "success" message and icon, and makes the action buttons unclickable again.
- **Customization:** The component should accept fragments or callbacks returning fragments for displaying messages and icons to allow for high customizability.

### Implementation Pseudocode

Here's a rough outline of how you might structure the implementation:

```jsx
import React from 'react';
import { Button, CircularProgress, Icon, Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { validateForm } from './validation'; // Assume this is a validation utility
import { useSubmitForm } from './api'; // Assume this is a custom hook for form submission

const FormSubmitComponent = ({ statusIcon, statusMessage, onSubmit }) => {
  const [status, setStatus] = useState('no_changes');
  const { handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm();

  const handleFormSubmit = async (data) => {
    setStatus('submitting');
    try {
      await onSubmit(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleReset = () => {
    reset();
    setStatus('no_changes');
  };

  return (
    <div>
      <div>
        {statusIcon}
        <Typography variant="body1">{statusMessage}</Typography>
      </div>
      <div>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          disabled={status === 'no_changes' || Object.keys(errors).length > 0 || isSubmitting}
        >
          Submit
        </Button>
        <Button onClick={handleReset} disabled={isSubmitting}>
          Reset
        </Button>
      </div>
      {status === 'submitting' && <CircularProgress />}
    </div>
  );
};

const MyForm = () => {
  const { control, handleSubmit, watch } = useForm();
  const { mutateAsync: submitForm } = useSubmitForm();
  const watchAllFields = watch();

  const validate = () => validateForm(watchAllFields);

  return (
    <form>
      {/* Form fields here using Controller from react-hook-form */}
      <Controller name="field1" control={control} render={({ field }) => <input {...field} />} />
      {/* Other fields */}

      <FormSubmitComponent
        statusIcon={<Icon>status_icon</Icon>}
        statusMessage={<span>Status Message</span>}
        onSubmit={submitForm}
      />
    </form>
  );
};

export default MyForm;
```

### Explanation:
- **useForm:** Used for handling form state and validation.
- **useState:** Manages the status of the form (e.g., no_changes, submitting, error, success).
- **handleSubmit:** Handles form submission, changing status based on the outcome.
- **Controller:** Manages form fields.

This outline ensures that the form submit component is reusable, customizable, and meets the specified requirements. You can further extend this with Zustand for state management, Zod for schema validation, and React Query for data fetching and synchronization.