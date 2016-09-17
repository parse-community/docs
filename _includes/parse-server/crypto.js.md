##### crypto.js

---

Uses bcrypt for password hashing and comparison

---

```
crypto.hash('hunter2').then( ... ).catch( ... );

crypto.compare('hunter2', 'previously-hashed-password-hash').then( ... ).catch( ... );
```