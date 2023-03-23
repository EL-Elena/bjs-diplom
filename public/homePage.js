const logout = new LogoutButton();
logout.action = () => ApiConnector.logout (response => {
  if(response.success === true){
    location.reload();
  };
});

ApiConnector.current (response => {
  if(response.success === true){
    ProfileWidget.showProfile(response.data);
  };
});

const rates = new RatesBoard();
function newRates() {
  ApiConnector.getStocks (response => {
    if(response.success === true){
      rates.clearTable();    
      rates.fillTable(response.data);
    };
  });
};

newRates();
setInterval(newRates, 60000);

const money = new MoneyManager();
money.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
  if(response.success === true){
    ProfileWidget.showProfile(response.data);
    money.setMessage(response.success, "Пополнено");
  } else {
    money.setMessage(response.success, response.error);
  }
});
money.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
  if(response.success === true){
    ProfileWidget.showProfile(response.data);
    money.setMessage(response.success, "Конвертация произведена");
  } else {
    money.setMessage(response.success, response.error);
  }
});
money.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
  if(response.success === true){
    ProfileWidget.showProfile(response.data);
    money.setMessage(response.success, "Перевод произведен");
  } else {
    money.setMessage(response.success, response.error);
  }
});

const newFavorite = new FavoritesWidget();
ApiConnector.getFavorites (response => {
  if(response.success === true){
    newFavorite.clearTable();    
    newFavorite.fillTable(response.data);
    money.updateUsersList(response.data);
  };
});
newFavorite.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
  if(response.success === true){
    newFavorite.clearTable();    
    newFavorite.fillTable(response.data);
    money.updateUsersList(response.data);
    newFavorite.setMessage(response.success, "Добавлен новый пользователь");
  } else {
    newFavorite.setMessage(response.success, response.error);
  }
});
newFavorite.removeUserCallback  = (data) => ApiConnector.removeUserFromFavorites(data, response => {
  if(response.success === true){
    newFavorite.clearTable();    
    newFavorite.fillTable(response.data);
    money.updateUsersList(response.data);
    newFavorite.setMessage(response.success, "Пользователь удален");
  } else {
    newFavorite.setMessage(response.success, response.error);
  }
});