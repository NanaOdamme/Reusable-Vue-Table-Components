document.addEventListener("DOMContentLoaded", function () {
    const app = Vue.createApp({
        components: {
            TableComponent
        },
        data() {
            return {
                tableHeaders: [
                    // image
                    { label: "ID", type: "text", key: "id", display: false },
                    { label: "Flag", type: "image", key: "flag", display: true },
                    { label: "Country", type: "text", key: "name", display: true },
                    { label: "Nationality", type: "text", key: "nationality", display: true },
                    { label: "Country Code", type: "text", key: "code", display: true }
                ],
                tableData: [],
                crudOptions: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true
                },
                selectedTheme: "indigo-lime",
               
            };
        },
        methods: {
            getFlagUrl(code) {
  return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
},

           async getTableData() {
    this.tableData = [
        { id: 1, name: "United States", nationality: "American", code: "US",  flag: this.getFlagUrl("US")},
        { id: 2, name: "Canada", nationality: "Canadian", code: "CA", flag: this.getFlagUrl("CA")},
        { id: 3, name: "United Kingdom", nationality: "British", code: "GB", flag: this.getFlagUrl("GB")},
        { id: 4, name: "Australia", nationality: "Australian", code: "AU", flag: this.getFlagUrl("AU")},
        { id: 5, name: "Germany", nationality: "German", code: "DE", flag: this.getFlagUrl("DE")},
        { id: 6, name: "France", nationality: "French", code: "FR", flag: this.getFlagUrl("FR")},
        { id: 7, name: "Japan", nationality: "Japanese", code: "JP", flag: this.getFlagUrl("JP")},
        { id: 8, name: "China", nationality: "Chinese", code: "CN", flag: this.getFlagUrl("CN")},
        { id: 9, name: "Brazil", nationality: "Brazilian", code: "BR", flag: this.getFlagUrl("BR")},
        { id: 10, name: "India", nationality: "Indian", code: "IN", flag: this.getFlagUrl("IN")},
    ];
},


            async handleAdd(newItem) {
                try {
                   newItem.id = Date.now();
                    this.tableData.push(newItem);
                    toastr.success("Nationality added successfully");
                } catch (error) {
                    console.error(error);
                    toastr.error(error.message || "Error adding nationality");
                }
            },

            async handleEdit(updatedItem, index) {
                try {
                   this.tableData.splice(index, 1, updatedItem);
                    toastr.success("Nationality updated successfully");
                } catch (error) {
                    console.error(error);
                    toastr.error(error.message || "Error updating nationality");
                }
            },

            async handleDelete(deletedItems) {
                try {
                   this.tableData = this.tableData.filter(row => !deletedItems.includes(row));
                    toastr.success("Nationality(s) deleted successfully");
                } catch (error) {
                    console.error(error);
                    toastr.error(error.message || "Error deleting nationality");
                }
            }
        },
        mounted() {
            this.getTableData();
        }
    });

    app.mount("#app");
});
