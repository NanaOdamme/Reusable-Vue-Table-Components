const TableComponent = {
    props: {
        headers: Array,
        tableData: Array,
        crudOptions: Object,
        selectedTheme: String
     
    },
    watch: {
        selectedTheme(newVal) {
            localStorage.setItem('themeOptions', newVal);
        },
        tableData: {
            handler(newData) {
                this.localTableData = JSON.parse(JSON.stringify(newData));
                this.initialTableData = JSON.parse(JSON.stringify(newData));
            },
            deep: true,
            immediate: true,
           
        },
        itemsPerPage(newVal, oldVal) {
            this.currentPage = 1; 
        }
    },

    data() {
        return {
          //  localTableData: [...this.tableData],
            localTableData: [],
            initialTableData: [],
            searchQuery: "",
            selectedRows: [],
            selectAll: false,
            currentPage: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 15, 20, 25, 50, 100],
            showModal: false,
            showConfirmDelete: false,
            modalTitle: "",
            formData: {},
            editIndex: null,
            sortColumn: null,
            sortDirection: 'asc',
            dataNumner: 0,
            themeOptions: {
                default: {
                    background: "bg-white",
                    textColor: "text-black",
                    thead: "bg-gray-200",
                    theadText: "text-gray-800",
                    headerBg: "bg-violet-800",
                    headerText: "text-white",
                    hoverRow: "hover:bg-gray-400",
                    buttonAdd: "hover:text-blue-700",
                    buttonEdit: "hover:text-green-700",
                    buttonDelete: "hover:text-red-700",
                    paginationActive: "bg-pink-500 text-white",
                    pagination: "bg-gray-200 text-gray-600",
                    rowHighlight: "bg-gray-300",

                    childBackground: "bg-gray-100",
                    childTextColor: "text-black",
                    childThead: "bg-gray-300",
                    childTheadText: "text-gray-800",
                    childHeaderBg: "bg-violet-600",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-blue-700",
                    childButtonEdit: "hover:text-green-700",
                    childButtonDelete: "hover:text-red-700",
                    childPaginationActive: "bg-violet-400 text-white",
                    childPagination: "bg-gray-200 text-gray-600",
                    
                    optionColor: "text-white bg-violet-800 hover:bg-violet-700",
                },
                dark: {
                    background: "bg-zinc-500",
                    textColor: "text-white",
                    thead: "bg-gray-800",
                    theadText: "text-gray-200",
                    headerBg: "bg-gray-800",
                    headerText: "text-white",
                    hoverRow: "hover:bg-gray-700",
                    buttonAdd: "hover:text-yellow-400",
                    buttonEdit: "hover:text-blue-400",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-yellow-400 text-black",
                    pagination: "bg-gray-700 text-gray-300",
                    childBackground: "bg-zinc-600",
                    childTextColor: "text-white",
                    childThead: "bg-gray-700",
                    childTheadText: "text-gray-300",
                    childHeaderBg: "bg-gray-700",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-yellow-300",
                    childButtonEdit: "hover:text-blue-300",
                    childButtonDelete: "hover:text-red-300",
                    childPaginationActive: "bg-yellow-300 text-black",
                    childPagination: "bg-gray-600 text-gray-200",
                    
                    optionColor: "text-white bg-gray-800 ",
                },
                light: {
                    background: "bg-gray-50",
                    textColor: "text-gray-800",
                    thead: "bg-gray-100",
                    theadText: "text-gray-700",
                    headerBg: "bg-sky-500",
                    headerText: "text-black",
                    hoverRow: "hover:bg-gray-200",
                    buttonAdd: "hover:text-green-500",
                    buttonEdit: "hover:text-blue-500",
                    buttonDelete: "hover:text-red-500",
                    paginationActive: "bg-blue-500 text-white",
                    pagination: "bg-gray-100 text-gray-600",
                    rowHighlight: "bg-gray-200",

                    childBackground: "bg-gray-100",
                    childTextColor: "text-gray-800",
                    childThead: "bg-gray-200",
                    childTheadText: "text-gray-700",
                    childHeaderBg: "bg-sky-400",
                    childHeaderText: "text-black",
                    childButtonAdd: "hover:text-green-400",
                    childButtonEdit: "hover:text-blue-400",
                    childButtonDelete: "hover:text-red-400",
                    childPaginationActive: "bg-blue-400 text-white",
                    childPagination: "bg-gray-200 text-gray-600",
                    
                    optionColor: "text-black bg-gray-100",
                },
                "orange-black": {
                    background: "bg-black",
                    textColor: "text-orange-200",
                    thead: "bg-gray-800",
                    theadText: "text-orange-100",
                    headerBg: "bg-orange-500",
                    headerText: "text-black",
                    hoverRow: "hover:bg-orange-100",
                    buttonAdd: "hover:text-black",
                    buttonEdit: "hover:text-orange-800",
                    buttonDelete: "hover:text-red-700",
                    paginationActive: "bg-orange-600 text-white",
                    pagination: "bg-black text-orange-200",
                    rowHighlight: "bg-orange-500 text-white",

                    childBackground: "bg-gray-900",
                    childTextColor: "text-orange-100",
                    childThead: "bg-gray-700",
                    childTheadText: "text-orange-200",
                    childHeaderBg: "bg-orange-400",
                    childHeaderText: "text-black",
                    childButtonAdd: "hover:text-orange-300",
                    childButtonEdit: "hover:text-orange-600",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-orange-500 text-white",
                    childPagination: "bg-black text-orange-200",
                    
                    optionColor: "text-orange-200 bg-black",
                },
                "green-purple": {
                    background: "bg-purple-50",
                    textColor: "text-purple-800",
                    thead: "bg-green-200",
                    theadText: "text-purple-700",
                    headerBg: "bg-green-600",
                    headerText: "text-purple-100",
                    hoverRow: "hover:bg-purple-200",
                    buttonAdd: "hover:text-purple-700",
                    buttonEdit: "hover:text-green-300",
                    buttonDelete: "hover:text-purple-500",
                    paginationActive: "bg-purple-600 text-white",
                    pagination: "bg-green-100 text-purple-800",
                    rowHighlight: "bg-green-600 text-white",

                    childBackground: "bg-purple-100",
                    childTextColor: "text-purple-900",
                    childThead: "bg-green-300",
                    childTheadText: "text-purple-800",
                    childHeaderBg: "bg-green-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-purple-600",
                    childButtonEdit: "hover:text-green-200",
                    childButtonDelete: "hover:text-purple-600",
                    childPaginationActive: "bg-purple-500 text-white",
                    childPagination: "bg-green-200 text-purple-800",
                    
                    optionColor: "text-purple-800 bg-green-200",
                },
                "red-gray": {
                    background: "bg-gray-50",
                    textColor: "text-gray-800",
                    thead: "bg-red-200",
                    theadText: "text-gray-700",
                    headerBg: "bg-red-600",
                    headerText: "text-gray-200",
                    hoverRow: "hover:bg-gray-200",
                    buttonAdd: "hover:text-gray-800",
                    buttonEdit: "hover:text-red-300",
                    buttonDelete: "hover:text-black",
                    paginationActive: "bg-gray-600 text-white",
                    pagination: "bg-red-100 text-gray-700",
                    rowHighlight: "bg-red-500 text-white",

                    childBackground: "bg-gray-100",
                    childTextColor: "text-gray-800",
                    childThead: "bg-red-100",
                    childTheadText: "text-gray-700",
                    childHeaderBg: "bg-red-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-gray-600",
                    childButtonEdit: "hover:text-red-200",
                    childButtonDelete: "hover:text-black",
                    childPaginationActive: "bg-gray-500 text-white",
                    childPagination: "bg-red-200 text-gray-700",
                    
                    optionColor: "text-gray-800 bg-red-200",
                },
                "blue-yellow": {
                    background: "bg-blue-50",
                    textColor: "text-blue-900",
                    thead: "bg-yellow-200",
                    theadText: "text-blue-800",
                    headerBg: "bg-blue-500",
                    headerText: "text-yellow-100",
                    hoverRow: "hover:bg-yellow-100",
                    buttonAdd: "hover:text-blue-600",
                    buttonEdit: "hover:text-yellow-600",
                    buttonDelete: "hover:text-red-600",
                    paginationActive: "bg-yellow-400 text-black",
                    pagination: "bg-blue-100 text-blue-800",
                    rowHighlight: "bg-yellow-400 text-black",

                    childBackground: "bg-blue-100",
                    childTextColor: "text-blue-900",
                    childThead: "bg-yellow-300",
                    childTheadText: "text-blue-800",
                    childHeaderBg: "bg-blue-400",
                    childHeaderText: "text-yellow-100",
                    childButtonAdd: "hover:text-blue-500",
                    childButtonEdit: "hover:text-yellow-500",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-yellow-300 text-black",
                    childPagination: "bg-blue-200 text-blue-800",
                    
                    optionColor: "text-blue-900 bg-yellow-200",
                },
                "teal-pink": {
                    background: "bg-pink-50",
                    textColor: "text-teal-800",
                    thead: "bg-teal-200",
                    theadText: "text-pink-800",
                    headerBg: "bg-teal-600",
                    headerText: "text-pink-100",
                    hoverRow: "hover:bg-pink-100",
                    buttonAdd: "hover:text-pink-600",
                    buttonEdit: "hover:text-teal-300",
                    buttonDelete: "hover:text-pink-400",
                    paginationActive: "bg-teal-500 text-white",
                    pagination: "bg-pink-100 text-teal-800",
                    rowHighlight: "bg-teal-600 text-white",

                    childBackground: "bg-pink-100",
                    childTextColor: "text-teal-800",
                    childThead: "bg-teal-300",
                    childTheadText: "text-pink-800",
                    childHeaderBg: "bg-teal-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-pink-500",
                    childButtonEdit: "hover:text-teal-200",
                    childButtonDelete: "hover:text-pink-500",
                    childPaginationActive: "bg-teal-400 text-white",
                    childPagination: "bg-pink-200 text-teal-800",
                    
                    optionColor: "text-teal-800 bg-pink-200",
                },
                "indigo-lime": {
                    background: "bg-lime-50",
                    textColor: "text-indigo-900",
                    thead: "bg-indigo-200",
                    theadText: "text-lime-800",
                    headerBg: "bg-indigo-600",
                    headerText: "text-lime-100",
                    hoverRow: "hover:bg-lime-100",
                    buttonAdd: "hover:text-indigo-600",
                    buttonEdit: "hover:text-lime-600",
                    buttonDelete: "hover:text-red-600",
                    paginationActive: "bg-lime-400 text-black",
                    pagination: "bg-indigo-100 text-indigo-800",
                    rowHighlight: "bg-lime-400 text-black",

                    childBackground: "bg-lime-100",
                    childTextColor: "text-indigo-900",
                    childThead: "bg-indigo-300",
                    childTheadText: "text-lime-800",
                    childHeaderBg: "bg-indigo-500",
                    childHeaderText: "text-lime-100",
                    childButtonAdd: "hover:text-indigo-500",
                    childButtonEdit: "hover:text-lime-500",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-lime-300 text-black",
                    childPagination: "bg-indigo-200 text-indigo-800",
                    
                    optionColor: "text-indigo-900 bg-lime-200",
                },
                "pink-gray": {
                    background: "bg-gray-100",
                    textColor: "text-pink-900",
                    thead: "bg-pink-200",
                    theadText: "text-gray-800",
                    headerBg: "bg-pink-600",
                    headerText: "text-gray-100",
                    hoverRow: "hover:bg-pink-100",
                    buttonAdd: "hover:text-gray-800",
                    buttonEdit: "hover:text-pink-300",
                    buttonDelete: "hover:text-black",
                    paginationActive: "bg-pink-400 text-white",
                    pagination: "bg-gray-200 text-pink-800",
                    rowHighlight: "bg-pink-500 text-white",

                    childBackground: "bg-gray-200",
                    childTextColor: "text-pink-800",
                    childThead: "bg-pink-300",
                    childTheadText: "text-gray-800",
                    childHeaderBg: "bg-pink-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-gray-600",
                    childButtonEdit: "hover:text-pink-200",
                    childButtonDelete: "hover:text-black",
                    childPaginationActive: "bg-pink-300 text-white",
                    childPagination: "bg-gray-300 text-pink-800",
                    
                    optionColor: "text-pink-900 bg-gray-300",
                },
                "sunset": {
                    background: "bg-orange-50",
                    textColor: "text-orange-900",
                    thead: "bg-rose-200",
                    theadText: "text-orange-800",
                    headerBg: "bg-orange-600",
                    headerText: "text-white",
                    hoverRow: "hover:bg-orange-100",
                    buttonAdd: "hover:text-rose-600",
                    buttonEdit: "hover:text-orange-400",
                    buttonDelete: "hover:text-red-500",
                    paginationActive: "bg-rose-400 text-black",
                    pagination: "bg-orange-200 text-orange-900",
                    rowHighlight: "bg-rose-300 text-black",

                    childBackground: "bg-orange-100",
                    childTextColor: "text-orange-900",
                    childThead: "bg-rose-300",
                    childTheadText: "text-orange-800",
                    childHeaderBg: "bg-orange-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-rose-500",
                    childButtonEdit: "hover:text-orange-300",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-rose-300 text-black",
                    childPagination: "bg-orange-300 text-orange-800",
                    
                    optionColor: "text-orange-900 bg-rose-200",
                },

                "aqua-frost": {
                    background: "bg-cyan-50",
                    textColor: "text-cyan-900",
                    thead: "bg-teal-100",
                    theadText: "text-cyan-800",
                    headerBg: "bg-cyan-600",
                    headerText: "text-white",
                    hoverRow: "hover:bg-cyan-100",
                    buttonAdd: "hover:text-teal-500",
                    buttonEdit: "hover:text-cyan-300",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-cyan-400 text-white",
                    pagination: "bg-cyan-100 text-cyan-900",
                    rowHighlight: "bg-cyan-300 text-black",

                    childBackground: "bg-cyan-100",
                    childTextColor: "text-cyan-900",
                    childThead: "bg-teal-200",
                    childTheadText: "text-cyan-700",
                    childHeaderBg: "bg-cyan-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-teal-400",
                    childButtonEdit: "hover:text-cyan-300",
                    childButtonDelete: "hover:text-red-400",
                    childPaginationActive: "bg-cyan-300 text-white",
                    childPagination: "bg-teal-100 text-cyan-800",
                    
                    optionColor: "text-cyan-900 bg-teal-100",
                },

                "cocoa-cream": {
                    background: "bg-yellow-50",
                    textColor: "text-amber-900",
                    thead: "bg-amber-100",
                    theadText: "text-stone-800",
                    headerBg: "bg-amber-600",
                    headerText: "text-white",
                    hoverRow: "hover:bg-yellow-100",
                    buttonAdd: "hover:text-amber-600",
                    buttonEdit: "hover:text-stone-700",
                    buttonDelete: "hover:text-red-500",
                    paginationActive: "bg-amber-300 text-black",
                    pagination: "bg-yellow-100 text-amber-800",
                    rowHighlight: "bg-amber-400 text-black",

                    childBackground: "bg-yellow-100",
                    childTextColor: "text-amber-900",
                    childThead: "bg-amber-200",
                    childTheadText: "text-stone-800",
                    childHeaderBg: "bg-amber-500",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-amber-500",
                    childButtonEdit: "hover:text-stone-600",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-amber-200 text-black",
                    childPagination: "bg-yellow-200 text-amber-800",
                    
                    optionColor: "text-amber-900 bg-yellow-200",
                },

                "forest": {
                    background: "bg-green-50",
                    textColor: "text-green-900",
                    thead: "bg-emerald-200",
                    theadText: "text-green-800",
                    headerBg: "bg-green-700",
                    headerText: "text-white",
                    hoverRow: "hover:bg-green-100",
                    buttonAdd: "hover:text-green-500",
                    buttonEdit: "hover:text-emerald-600",
                    buttonDelete: "hover:text-red-500",
                    paginationActive: "bg-emerald-400 text-white",
                    pagination: "bg-green-100 text-green-800",
                    rowHighlight: "bg-emerald-300 text-black",

                    childBackground: "bg-green-100",
                    childTextColor: "text-green-900",
                    childThead: "bg-emerald-300",
                    childTheadText: "text-green-800",
                    childHeaderBg: "bg-green-600",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-green-400",
                    childButtonEdit: "hover:text-emerald-500",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-emerald-300 text-white",
                    childPagination: "bg-green-200 text-green-800",
                    
                    optionColor: "text-green-900 bg-emerald-200",
                },

                "lavender-night": {
                    background: "bg-purple-50",
                    textColor: "text-indigo-900",
                    thead: "bg-purple-200",
                    theadText: "text-indigo-800",
                    headerBg: "bg-purple-700",
                    headerText: "text-white",
                    hoverRow: "hover:bg-purple-100",
                    buttonAdd: "hover:text-indigo-600",
                    buttonEdit: "hover:text-purple-400",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-purple-400 text-white",
                    pagination: "bg-purple-100 text-indigo-800",
                    rowHighlight: "bg-purple-500 text-white",

                    childBackground: "bg-purple-100",
                    childTextColor: "text-indigo-900",
                    childThead: "bg-purple-300",
                    childTheadText: "text-indigo-800",
                    childHeaderBg: "bg-purple-600",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-indigo-500",
                    childButtonEdit: "hover:text-purple-300",
                    childButtonDelete: "hover:text-red-400",
                    childPaginationActive: "bg-purple-300 text-white",
                    childPagination: "bg-purple-200 text-indigo-800",
                    
                    optionColor: "text-indigo-900 bg-purple-200",
                },

                "silver-shadow": {
                    background: "bg-gray-50",
                    textColor: "text-gray-900",
                    thead: "bg-gray-200",
                    theadText: "text-gray-800",
                    headerBg: "bg-gray-700",
                    headerText: "text-white",
                    hoverRow: "hover:bg-gray-100",
                    buttonAdd: "hover:text-gray-600",
                    buttonEdit: "hover:text-gray-500",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-gray-400 text-white",
                    pagination: "bg-gray-100 text-gray-800",
                    rowHighlight: "bg-gray-300 text-black",

                    childBackground: "bg-gray-100",
                    childTextColor: "text-gray-900",
                    childThead: "bg-gray-300",
                    childTheadText: "text-gray-800",
                    childHeaderBg: "bg-gray-600",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-gray-500",
                    childButtonEdit: "hover:text-gray-400",
                    childButtonDelete: "hover:text-red-400",
                    childPaginationActive: "bg-gray-300 text-white",
                    childPagination: "bg-gray-200 text-gray-800",
                    
                    optionColor: "text-gray-900 bg-gray-200",
                },

                "coral-sea": {
                    background: "bg-red-50",
                    textColor: "text-rose-900",
                    thead: "bg-orange-200",
                    theadText: "text-red-800",
                    headerBg: "bg-rose-500",
                    headerText: "text-white",
                    hoverRow: "hover:bg-rose-100",
                    buttonAdd: "hover:text-orange-500",
                    buttonEdit: "hover:text-rose-400",
                    buttonDelete: "hover:text-red-600",
                    paginationActive: "bg-rose-400 text-white",
                    pagination: "bg-red-100 text-rose-800",
                    rowHighlight: "bg-rose-300 text-black",

                    childBackground: "bg-red-100",
                    childTextColor: "text-rose-900",
                    childThead: "bg-orange-300",
                    childTheadText: "text-red-800",
                    childHeaderBg: "bg-rose-400",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-orange-400",
                    childButtonEdit: "hover:text-rose-300",
                    childButtonDelete: "hover:text-red-500",
                    childPaginationActive: "bg-rose-300 text-white",
                    childPagination: "bg-red-200 text-rose-800",
                    
                    optionColor: "text-rose-900 bg-orange-200",
                },

                "space": {
                    background: "bg-black",
                    textColor: "text-white",
                    thead: "bg-gray-800",
                    theadText: "text-gray-100",
                    headerBg: "bg-gray-900",
                    headerText: "text-white",
                    hoverRow: "hover:bg-gray-700",
                    buttonAdd: "hover:text-yellow-400",
                    buttonEdit: "hover:text-blue-400",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-gray-700 text-white",
                    pagination: "bg-black text-white",
                    rowHighlight: "bg-gray-600 text-white",

                    childBackground: "bg-gray-900",
                    childTextColor: "text-white",
                    childThead: "bg-gray-700",
                    childTheadText: "text-gray-100",
                    childHeaderBg: "bg-gray-800",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-yellow-300",
                    childButtonEdit: "hover:text-blue-300",
                    childButtonDelete: "hover:text-red-300",
                    childPaginationActive: "bg-gray-600 text-white",
                    childPagination: "bg-gray-900 text-white",
                    
                    optionColor: "text-white bg-gray-800",
                },

                "candy": {
                    background: "bg-pink-100",
                    textColor: "text-fuchsia-900",
                    thead: "bg-pink-300",
                    theadText: "text-fuchsia-800",
                    headerBg: "bg-fuchsia-500",
                    headerText: "text-white",
                    hoverRow: "hover:bg-pink-200",
                    buttonAdd: "hover:text-fuchsia-400",
                    buttonEdit: "hover:text-pink-400",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-fuchsia-400 text-white",
                    pagination: "bg-pink-200 text-fuchsia-900",
                    rowHighlight: "bg-pink-400 text-black",

                    childBackground: "bg-pink-200",
                    childTextColor: "text-fuchsia-800",
                    childThead: "bg-pink-400",
                    childTheadText: "text-fuchsia-700",
                    childHeaderBg: "bg-fuchsia-400",
                    childHeaderText: "text-white",
                    childButtonAdd: "hover:text-pink-300",
                    childButtonEdit: "hover:text-fuchsia-300",
                    childButtonDelete: "hover:text-red-300",
                    childPaginationActive: "bg-pink-300 text-white",
                    childPagination: "bg-pink-400 text-fuchsia-800",
                    
                    optionColor: "text-fuchsia-900 bg-pink-300",
                },

                "lemonade": {
                    background: "bg-lime-50",
                    textColor: "text-lime-900",
                    thead: "bg-yellow-200",
                    theadText: "text-lime-800",
                    headerBg: "bg-yellow-400",
                    headerText: "text-black",
                    hoverRow: "hover:bg-yellow-100",
                    buttonAdd: "hover:text-lime-500",
                    buttonEdit: "hover:text-yellow-500",
                    buttonDelete: "hover:text-red-400",
                    paginationActive: "bg-yellow-300 text-black",
                    pagination: "bg-lime-100 text-lime-900",
                    rowHighlight: "bg-yellow-400 text-black",

                    childBackground: "bg-lime-100",
                    childTextColor: "text-lime-900",
                    childThead: "bg-yellow-300",
                    childTheadText: "text-lime-800",
                    childHeaderBg: "bg-yellow-400",
                    childHeaderText: "text-black",
                    childButtonAdd: "hover:text-lime-400",
                    childButtonEdit: "hover:text-yellow-400",
                    childButtonDelete: "hover:text-red-300",
                    childPaginationActive: "bg-yellow-300 text-black",
                    childPagination: "bg-lime-200 text-lime-800",
                    
                    optionColor: "text-lime-900 bg-yellow-200",
                }

            },
            selectedTheme: localStorage.getItem('themeOptions') || 'default',
            
        };
    },
    computed: {
        currentTheme() {
            return this.themeOptions[this.selectedTheme];
        },
        filteredData() {
            return this.localTableData.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            );
        },
        //count the data in the table
        
    
        sortedData() {
            if (!this.sortColumn) return this.filteredData;
            return [...this.filteredData].sort((a, b) => {
                let valA = a[this.sortColumn];
                let valB = b[this.sortColumn];
                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();
                if (!isNaN(valA) && !isNaN(valB)) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                return this.sortDirection === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
            });
        },
        totalPages() {
            return Math.ceil(this.sortedData.length / this.itemsPerPage);
        },
        paginatedData() {
            return this.sortedData.slice(
                (this.currentPage - 1) * this.itemsPerPage,
                this.currentPage * this.itemsPerPage
            );
        },
    },
    methods: {
        dataCount() {
           this.dataNumber = this.filteredData.length;
           return this.dataNumber;
            
        },
        toggleAll() {
            this.selectedRows = this.selectAll ? [...this.paginatedData] : [];
        },
        openModal(type) {
            this.showModal = true;
            if (type === "add") {
                this.modalTitle = "Add Entry";
                this.formData = this.headers.reduce((obj, header) => ({ ...obj, [header]: "" }), {});
                this.editIndex = null;
            } else if (type === "edit" && this.selectedRows.length === 1) {
                this.modalTitle = "Edit Entry";
                this.formData = { ...this.selectedRows[0] };
                this.editIndex = this.localTableData.indexOf(this.selectedRows[0]);


            }
        },
        closeModal() {
            this.showModal = false;
            this.formData = {};
        },
        deleteSelected() {
            this.localTableData = this.localTableData.filter(item => !this.selectedRows.includes(item));
            this.selectedRows = [];
            this.selectAll = false;
        },
        submitForm() {
            if (this.editIndex !== null) {
                const updatedItem = { ...this.formData };
                this.$emit('edit', updatedItem, this.editIndex);
                this.localTableData[this.editIndex] = updatedItem;
            } else {
                const newItem = { ...this.formData };
                this.$emit('add', newItem);
                this.localTableData.push(newItem);
            }
            this.selectedRows = [];
            this.closeModal();
        },

        confirmDelete() {
            const deletedItems = [...this.selectedRows];
            this.$emit('delete', deletedItems);
            this.localTableData = this.localTableData.filter(item => !this.selectedRows.includes(item));
            this.selectedRows = [];
            this.selectAll = false;
            this.showConfirmDelete = false;
        },

        openDeleteConfirmation() {
            if (this.selectedRows.length === 0) {
                alert("No items selected to delete!");
                return;
            }
            this.showConfirmDelete = true;
        },
        refreshTable() {
            this.localTableData = JSON.parse(JSON.stringify(this.initialTableData));
            this.searchQuery = '';
            this.sortColumn = null;
            this.sortDirection = 'asc';
            this.currentPage = 1;
            this.selectedRows = [];
            this.selectAll = false;
            this.closeModal();
            this.showConfirmDelete = false;
        },

        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        sortTable(column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }
        }
    },
    template: `
         <div>
         <div class="table-container w-full mt-10">
           <div :class="['rounded p-3 sm:p-5 flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 w-full', currentTheme.headerBg, currentTheme.headerText]">

            <!-- Left controls -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-5 w-full sm:w-auto">
                <button v-if="crudOptions?.allowAdding" @click="openModal('add')" :class="currentTheme.buttonAdd">
                    <i class="bi bi-plus-circle"></i>
                </button>
                <button v-if="crudOptions?.allowEditing" @click="openModal('edit')" :disabled="selectedRows.length !== 1" :class="currentTheme.buttonEdit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button v-if="crudOptions?.allowDeleting" @click="openDeleteConfirmation" :class="currentTheme.buttonDelete">
                    <i class="bi bi-trash"></i>
                </button>
                <button @click="refreshTable" class="text-white">
                    <i class="bi bi-arrow-clockwise"></i>
                </button>

                <input v-model="searchQuery" type="text" class="p-2 rounded-lg text-gray-500 w-full sm:w-auto text-sm" placeholder="Search">
            </div>

            <!-- Theme selector -->
            <div class="flex items-center gap-2 sm:gap-3 hover:bg-white hover:text-black rounded-lg p-2 w-full sm:w-auto">
                <label class="font-semibold flex items-center gap-1">
                <i class="bi bi-paint-bucket"></i> Themes
                </label>
                <select v-model="selectedTheme" class="p-2 rounded-md text-sm w-full sm:w-auto text-black">
                    <option v-for="(theme, name) in themeOptions" :key="name" :value="name" :class="currentTheme.optionColor">
                    {{ name.charAt(0).toUpperCase() + name.slice(1) }}
                    </option>
                </select>
            </div>
         </div>
         <div class="table-container w-full overflow-x-auto">
            <table class="min-w-full border border-gray-200 rounded-lg text-sm">
                <thead :class="[currentTheme.thead, currentTheme.theadText]">
                    <tr class="text-left">
                        <th class="py-2 px-4 border border-white"><input type="checkbox" v-model="selectAll" @change="toggleAll"></th>
                        <th v-for="(header, index) in headers.filter(h => h.display)" :key="index" class="py-2 px-4 border cursor-pointer" @click="sortTable(header.key)">
                            {{ header.label }}
                        <span v-if="sortColumn === header.key">
                        {{ sortDirection === 'asc' ? '▲' : '▼' }}
                        </span>
                        </th>
                    </tr>
                </thead>
                 <tbody :class="['text-left', currentTheme.background, currentTheme.textColor]">
                    <tr v-for="(item, index) in paginatedData" :key="index" :class=" currentTheme.hoverRow">
                        <td class="py-2 px-4 border border-white"><input type="checkbox" v-model="selectedRows" :value="item"></td>
                      <td v-for="(header, idx) in headers.filter(h => h.display)" :key="idx" class="py-2 px-4 border border-white">
  <img v-if="header.type === 'image'" :src="item[header.key]" alt="Flag" class="w-8 h-5 object-cover rounded" />
  <span v-else>{{ item[header.key] }}</span>
</td>

                      </tr>
                </tbody>
            </table>
         </div>
        <div class="flex justify-end mt-4 space-x-2 items-center text-sm">
         <!-- Items Per Page Selector -->
            <label for="itemsPerPage" class="mr-2 text-sm text-light">Items per page:</label>
             <select id="itemsPerPage" v-model.number="itemsPerPage" class="border px-2 py-1 rounded">
                <option v-for="option in itemsPerPageOptions" :key="option" :value="option" :class="currentTheme.optionColor">
                {{ option }}
                </option>
            </select>
        <!-- Pagination Buttons -->
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200">«</button>
            <button v-for="n in totalPages" :key="n" @click="currentPage = n" class="px-3 py-1" :class="currentPage === n ? currentTheme.paginationActive : currentTheme.pagination">
                {{ n }}
            </button>
             <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-200">»</button>

            <span class="ml-4 text-sm text-gray-600">Total: {{ dataCount() }} items</span>
        </div>

        </div>
         <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="bg-white p-5 rounded-lg shadow-lg w-1/3">
                    <h2 class="text-lg font-bold mb-3">{{ modalTitle }}</h2>
                    <div v-for="(header) in headers.filter(h => h.display)" :key="header.label" class="mb-3">
                    <label class="block text-sm font-medium text-gray-700">{{ header.key }}</label>
                    <input v-if="header.type === 'text'" v-model="formData[header.key]" type="text" class="w-full p-2 border rounded-lg">
                    <input v-else-if="header.type === 'number'" v-model="formData[header.key]" type="number" class="w-full p-2 border rounded-lg">
                    <input v-else-if="header.type === 'date'" v-model="formData[header.key]" type="date" class="w-full p-2 border rounded-lg">
                    <select v-else-if="header.type === 'select'" v-model="formData[header.key]" class="w-full p-2 border rounded-lg">
                        <option v-for="option in header.options" :key="option" :value="option">{{ option }}</option>
                    </select>

                    <!--- Image input for 'image' type use url -->
                    <input v-else-if="header.type === 'image'" v-model="formData[header.key]" type="text" class="w-full p-2 border rounded-lg" placeholder="Enter image URL">
                    
                </div>

            <div class="flex justify-end space-x-3">
                <button @click="submitForm" class="px-4 py-2 bg-green-500 text-white rounded">Save</button>
                <button @click="closeModal" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
            </div>
        </div>
    </div>
       <!-- Confirmation Delete Modal -->
        <div v-if="showConfirmDelete" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-5 rounded-lg shadow-lg w-1/3">
                <h2 class="text-lg font-bold mb-3">Confirm Deletion</h2>
                <p>Are you sure you want to delete the selected items?</p>
                <div class="flex justify-end space-x-3 mt-4">
                    <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded">Yes, Delete</button>
                    <button @click="showConfirmDelete = false" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                </div>
            </div>
        </div>
    </div>
        
    `
};
