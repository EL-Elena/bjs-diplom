'use strict';

const newObjectUserForm = new UserForm();

newObjectUserForm.loginFormCallback = (data) => ApiConnector.login(data, response => {
  if(response.success === true){
    location.reload();
  } else {
      newObjectUserForm.setLoginErrorMessage(response.error);
  };
});

newObjectUserForm.registerFormCallback = (data) => ApiConnector.register(data, response => {
    if(response.success === true){
      location.reload();
    } else {
        newObjectUserForm.setRegisterErrorMessage(response.error);
    };
  });