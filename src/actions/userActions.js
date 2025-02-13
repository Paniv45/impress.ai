// Fetch users from the API
export const getUsers = () => async dispatch => {
  try {
    const response = await fetch('http://example.com/users');
    const parsedResponse = await response.json();
    dispatch({
      type: 'LIST_USERS',
      payload: parsedResponse
    });
  } catch (e) {
    console.log(e);
  }
};

// Add a new user
export const addUser = (payload) => async dispatch => {
  try {
    const response = await fetch("http://example.com/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};

// Edit an existing user
export const editUser = (id, updatedUser) => async dispatch => {
  try {
    const response = await fetch(`http://example.com/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};

// Delete a user
export const deleteUser = (id) => async dispatch => {
  try {
    const response = await fetch(`http://example.com/user/${id}`, {
      method: "DELETE",
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};
