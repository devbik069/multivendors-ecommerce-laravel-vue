import { defineStore } from "pinia";
export const useBulkDelete = defineStore("bulkDelete", {
    state: () => ({
        selectedData: [],
        selectAll: false,
    }),

    getters: {
        getSelected: (state) => {
            return state.selectedData;
        },
    },

    actions: {
        selectAllData(data) {
            if (this.selectAll) {
                this.selectedData = data.map((data) => data.id);
            } else {
                this.selectedData = [];
            }
        },

        toggleSelection(data) {
            const index = this.selectedData.indexOf(data?.id);
            if (index === -1) {
                this.selectedData.push(data?.id);
            } else {
                this.selectedData.splice(index, 1);
            }
        },
    },
});