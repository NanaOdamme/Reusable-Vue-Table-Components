r **reusable Vue 3 data table component**

* Integration (with or without API)
* Detailed explanation of `add`, `edit`, and `delete` handler parameters
* Flexibility and customization
* Clear structure to help any user onboard fast

---

# 🔄 Reusable Vue 3 Table Component

A reusable, dynamic, and theme-able Vue 3 table component that supports custom headers, full CRUD (Create, Read, Update, Delete) operations, and both local and API-driven data handling.

---

## 📌 Key Features

* ✅ Dynamic headers (custom fields and keys)
* ✅ Add / Edit / Delete support with external handlers
* ✅ API or local data source compatible
* ✅ Theme support (dark, light, custom)
* ✅ Fully customizable CRUD logic
* ✅ Emits clean payloads for integration into any project

---

## 🧱 Component Structure

```vue
<TableComponent
  :headers="tableHeaders"
  :data="tableData"
  :crud-options="crudOptions"
  :on-add="handleAdd"
  :on-edit="handleEdit"
  :on-delete="handleDelete"
  :theme="selectedTheme"
/>
```

---

## 🧩 Props

| Prop          | Type     | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| `headers`     | Array    | Defines the columns (see below)              |
| `data`        | Array    | The array of objects to display in the table |
| `crudOptions` | Object   | Flags to enable or disable Add/Edit/Delete   |
| `onAdd`       | Function | Handler for adding new data                  |
| `onEdit`      | Function | Handler for editing a row                    |
| `onDelete`    | Function | Handler for deleting one or multiple rows    |
| `theme`       | String   | Theme name (e.g., `"default"`, `"dark"`)     |

---

## 🧾 Header Format

Define headers using an array of objects with the following shape:

```js
tableHeaders: [
  {
    label: "Display Name", // e.g., "Country"
    key: "propertyName",   // e.g., "name"
    type: "text" | "number" | "date" | "select",
    display: true | false  // Whether to show this column
  }
]
```

**Example:**

```js
tableHeaders: [
  { label: "Name", key: "name", type: "text", display: true },
  { label: "Email", key: "email", type: "text", display: true },
  { label: "Age", key: "age", type: "number", display: true }
]
```

---

## 🔁 CRUD Options

Set which actions are allowed:

```js
crudOptions: {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true
}
```

---

## ⚙️ CRUD Handlers

These methods must be defined in your component. They are **completely customizable**, allowing API or local data handling.

---

### ➕ `onAdd(newItem)`

Triggered when a user submits the **Add New** form.

#### Parameters:

| Name    | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| newItem | Object | The new row object from form |

#### Example (with API):

```js
async handleAdd(newItem) {
  const response = await axios.post("/api/your-endpoint", newItem);
  this.tableData.push(response.data);
}
```

#### Example (without API):

```js
handleAdd(newItem) {
  newItem.id = Date.now();
  this.tableData.push(newItem);
}
```

---

### ✏️ `onEdit(updatedItem, index)`

Triggered when a row is edited and saved.

#### Parameters:

| Name        | Type   | Description                        |
| ----------- | ------ | ---------------------------------- |
| updatedItem | Object | The modified object from the table |
| index       | Number | Index of the row in `tableData`    |

#### Example (with API):

```js
async handleEdit(updatedItem, index) {
  await axios.put(`/api/your-endpoint/${updatedItem.id}`, updatedItem);
  this.tableData.splice(index, 1, updatedItem);
}
```

#### Example (local):

```js
handleEdit(updatedItem, index) {
  this.tableData.splice(index, 1, updatedItem);
}
```

---

### 🗑️ `onDelete(deletedItems)`

Triggered when user deletes one or more selected rows.

#### Parameters:

| Name         | Type  | Description                           |
| ------------ | ----- | ------------------------------------- |
| deletedItems | Array | Array of selected items to be deleted |

#### Example (with API):

```js
async handleDelete(deletedItems) {
  for (const item of deletedItems) {
    await axios.delete(`/api/your-endpoint/${item.id}`);
  }
  this.tableData = this.tableData.filter(d => !deletedItems.includes(d));
}
```

#### Example (local):

```js
handleDelete(deletedItems) {
  this.tableData = this.tableData.filter(d => !deletedItems.includes(d));
}
```

---

## 🎨 Theme Support

Pass your custom theme string as a prop:

```js
selectedTheme: "dark" // or "neon", "light", etc.
```

> ✅ Your component must be styled to switch themes using this string

---

## 🛠 Example Integration

```js
document.addEventListener("DOMContentLoaded", function () {
  const app = Vue.createApp({
    components: { TableComponent },
    data() {
      return {
        tableHeaders: [
          { label: "Country", key: "name", type: "text", display: true },
          { label: "Nationality", key: "nationality", type: "text", display: true },
          { label: "Code", key: "code", type: "text", display: true }
        ],
        tableData: [],
        crudOptions: { allowAdding: true, allowEditing: true, allowDeleting: true },
        selectedTheme: "default"
      };
    },
    methods: {
      async handleAdd(newItem) { /* ... */ },
      async handleEdit(updatedItem, index) { /* ... */ },
      async handleDelete(deletedItems) { /* ... */ },
      async fetchData() {
        const res = await axios.get("/api/nationalities");
        this.tableData = res.data;
      }
    },
    mounted() {
      this.fetchData();
    }
  });

  app.mount("#app");
});
```

---

## 🧪 Use Cases

* Country/nationality setup
* Product listings
* Employee directories
* Task trackers

---


