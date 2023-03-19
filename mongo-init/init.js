db = db.getSiblingDB("admin");

db.auth("cni-root", "8ltKz7E2iqr7");

db = db.getSiblingDB("tutorials");

db.createUser({
  user: "cni-tutorials",
  pwd: "4G87od7Gc4Ni",
  roles: [
    {
      role: "readWrite",
      db: "tutorials",
    },
  ],
});
