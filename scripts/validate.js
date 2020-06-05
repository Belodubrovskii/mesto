const showInputError = (formElement, inputElement, errorMessage, toolsObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(toolsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(toolsObject.errorClass);
};

const hideInputError = (formElement, inputElement, toolsObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(toolsObject.inputErrorClass);
  errorElement.classList.remove(toolsObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, toolsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, toolsObject);
  } else {
    hideInputError(formElement, inputElement, toolsObject);
  }
};

const setEventListeners = (formElement, toolsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(toolsObject.inputSelector));
  const buttonElement = formElement.querySelector(toolsObject.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, toolsObject);
      toggleButtonState(inputList, buttonElement, toolsObject.inactiveButtonClass);
    });
  });
};

const enableValidation = (toolsObject) => {
  const formList = Array.from(document.querySelectorAll(toolsObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, toolsObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some( function (inputElement) {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

