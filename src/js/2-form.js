// Key for localStorage
const STORAGE_KEY = 'feedback-form-state';

// Form data object
let formData = { email: '', message: '' };

// Get form element
const form = document.querySelector('.feedback-form');

// Load data on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Listen for form changes
form.addEventListener('input', onFormInput);

// Listen for form submission
form.addEventListener('submit', onFormSubmit);

// Load data from localStorage
function loadFormData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    console.log('Loading from localStorage:', savedData);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Update formData with protection from undefined
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      // Fill form fields
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;

      console.log('FormData after loading:', formData);
    } else {
      console.log('No data in localStorage');
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
}

// Handle form input
function onFormInput(event) {
  console.log(
    'Input event on:',
    event.target.name,
    '| Value:',
    event.target.value
  );

  // Update formData with current form values
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;

  console.log('Updated formData:', formData);

  // Create object for localStorage with trimmed spaces
  const dataToSave = {
    email: formData.email.trim(),
    message: formData.message.trim(),
  };

  console.log('Data to save:', dataToSave);

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

  console.log('Saved to localStorage');
  console.log(
    'Current localStorage content:',
    localStorage.getItem(STORAGE_KEY)
  );
}

// Handle form submission
function onFormSubmit(event) {
  event.preventDefault();
  console.log('Form submission attempt...');

  // Update formData with current values (trimmed)
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  console.log('FormData for submission:', formData);

  // Check if both fields are filled
  if (!formData.email || !formData.message) {
    console.log('Not all fields are filled!');
    console.log('Email:', formData.email ? 'filled' : 'empty');
    console.log('Message:', formData.message ? 'filled' : 'empty');
    alert('Fill please all fields');
    return;
  }

  console.log('All fields filled! Submitting form...');

  // Output final form data to console
  console.log(formData);

  // Clear localStorage
  localStorage.removeItem(STORAGE_KEY);
  console.log('localStorage cleared');

  // Clear formData object
  formData.email = '';
  formData.message = '';
  console.log('FormData cleared:', formData);

  // Reset form
  form.reset();
  console.log('Form reset');
}
