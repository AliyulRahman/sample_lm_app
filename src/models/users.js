const STORAGE_KEY = "literaire_users";

function getStoredUsers() {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function addUser(user) {
  const currentUsers = getStoredUsers();
  currentUsers.push(user);
  saveUsers(currentUsers);
}

export function getUsers() {
  return getStoredUsers();
}

export function updateUser(email, updates) {
  const users = getStoredUsers();
  const updatedUsers = users.map((user) =>
    user.email === email ? { ...user, ...updates } : user
  );
  saveUsers(updatedUsers);
}

export function getUserByEmail(email) {
  const users = getStoredUsers();
  return users.find((user) => user.email === email);
}
