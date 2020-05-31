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

export const setPatientUser = (payload) => ({
  type: 'USER/SET_PATIENT_USER',
  payload,
});

export const setEditingTest = (payload) => ({
  type: 'USER/SET_EDITING_TEST',
  payload,
});
