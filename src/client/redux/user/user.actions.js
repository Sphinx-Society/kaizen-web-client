export const setUser = (payload) => ({
  type: 'USER/SET_USER',
  payload,
});

export const setUsers = (payload) => ({
  type: 'USER/SET_USERS',
  payload,
});

export const setEditingUser = (payload) => ({
  type: 'USER/SET_EDITING_USER',
  payload,
});

export const setSelectedTests = (payload) => ({
  type: 'USER/SET_SELECTED_TESTS',
  payload,
});

export const setFailedFilesLink = (payload) => ({
  type: 'USER/SET_FAILED_FILES_LINK',
  payload,
});

export const setPatientUser = (payload) => ({
  type: 'USER/SET_PATIENT_USER',
  payload,
});
export const setPatientTestTemplate = (payload) => ({
  type: 'USER/SET_PATIENT_TEST_TEMPLATE',
  payload,
});

export const setEditingTest = (payload) => ({
  type: 'USER/SET_EDITING_TEST',
  payload,
});
