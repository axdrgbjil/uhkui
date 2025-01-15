// src/app/lib/store.js
import fs from 'fs';
import path from 'path';

class Store {
  constructor() {
    this.storePath = path.join(process.cwd(), 'data', 'users.json');
    this.ensureStoreExists();
    this.users = this.loadUsers();
    
    // Initialize admin account if not exists
    if (!this.users['admin']) {
      this.users['admin'] = {
        password: 'a#$#%dmin1234',
        role: 'admin'
      };
      this.saveUsers();
    }
  }

  ensureStoreExists() {
    const dir = path.dirname(this.storePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.storePath)) {
      fs.writeFileSync(this.storePath, JSON.stringify({}, null, 2));
    }
  }

  loadUsers() {
    try {
      const data = fs.readFileSync(this.storePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading users:', error);
      return {};
    }
  }

  saveUsers() {
    try {
      fs.writeFileSync(this.storePath, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  addUser(username, password) {
    console.log('Attempting to add user:', username);
    
    if (this.users[username]) {
      console.log('User already exists:', username);
      return false;
    }
    
    this.users[username] = {
      password: password,
      role: 'user'
    };
    
    this.saveUsers();
    console.log('User added successfully:', username);
    return true;
  }

  getUser(username) {
    console.log('Getting user:', username);
    return this.users[username];
  }
}

// Create and export a singleton instance
const store = new Store();
export default store;